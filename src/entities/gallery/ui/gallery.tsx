import { memo, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { getName } from "../../../entities/manufacturer";
import { ImgUrlType } from "../../../entities/specification";
import {
  deleteFavorite,
  fetchFavoritesById,
  fetchHash,
  getAuthStatus,
  getFavoritesById,
  getFavoritesByIdLoadingStatus,
  Login,
  postFavorite,
  resetMycarsFavoritesCountLoadingStatus,
} from "../../user";

import { getPromoGallery, getPromoGalleryLoadingStatus } from "../model/gallery-selectors";
import { GalleryPagination } from "./gallery-pagination";
import { GalleryType } from "../lib/types";
import classes from "./gallery.module.sass";

type GalleryProps = {
  handlePromo?: ((promoManufacturer: number, promoModel: number, promoSpecification: number) => void) | null;
  manufacturerId: number | null | undefined;
  specificationId: number | null;
  modelId: number | null;
  galleryList?: ImgUrlType[];
  initSlide?: number;
};

export const Gallery = memo(
  ({
    specificationId,
    modelId,
    manufacturerId,
    galleryList,
    handlePromo,
    initSlide = 0,
  }: GalleryProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const [currentImage, setCurrentImage] = useState(initSlide);
    const [gallery, setGallery] = useState<GalleryType[]>([]);
    const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
    const [isLogin, setIsLogin] = useState(false);
    const [favoriteIdToAdd, setFavoriteIdToAdd] = useState<number | null>(null);
    const isAuth = useAppSelector(getAuthStatus);
    const name = useAppSelector((state) => getName(state, modelId));
    const promoGallery = useAppSelector(getPromoGallery);
    const promoGalleryLoadingStatus = useAppSelector(getPromoGalleryLoadingStatus);
    const favoritesList = useAppSelector(getFavoritesById);
    const favoritesByIdLoadingStatus = useAppSelector(getFavoritesByIdLoadingStatus);

    const handlers = useSwipeable({
      onSwipedLeft: handleNext,
      onSwipedRight: handlePrev,
    });

    useEffect(() => {
      setCurrentImage(0);
    }, [specificationId]);

    useEffect(() => {
      setCurrentImage(initSlide);
    }, [initSlide]);

    useEffect(() => {
      if (specificationId && modelId && manufacturerId && galleryList) {
        setGallery(
          galleryList.map((url) => ({
            specificationId: specificationId as number,
            model: {
              id: modelId as number,
              name: name?.model as string,
            },
            manufacturer: {
              id: manufacturerId as number,
              name: name?.manufacturer as string,
            },
            url,
          })),
        );
      }

      if (handlePromo) {
        setGallery(promoGallery);
      }
    }, [specificationId, galleryList, promoGallery.length]);

    useEffect(() => {
      if (gallery.length > 0 && isAuth && !favoritesByIdLoadingStatus.isLoading) {
        dispatch(
          fetchFavoritesById({
            typeId: 1,
            favorableIds: Array.from(new Set(gallery.map((element) => element.specificationId))),
          }),
        );
      }
    }, [gallery, isAuth]);

    useEffect(() => {
      if (gallery.length > 0) {
        setPreloadedImages([gallery[0].url.big]);
      }

      const promises = gallery.map(
        (image) =>
          new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.src = `${process.env.STATIC_URL || `${window.location.origin}/storage`}${image.url.big}`;
            img.onload = () =>
              resolve(`${process.env.STATIC_URL || `${window.location.origin}/storage`}${image.url.big}`);
            img.onerror = () => reject();
          }),
      );

      const preload = async () => {
        const images = await Promise.all(promises);

        setPreloadedImages(images);
      };

      preload();
    }, [gallery]);

    function handleNext() {
      setCurrentImage((current) => (current + 1 === gallery!.length ? 0 : current + 1));
    }

    function handlePrev() {
      setCurrentImage((current) => (current === 0 ? gallery!.length - 1 : current - 1));
    }

    const handlePromoClick = () => {
      if (handlePromo && gallery) {
        handlePromo(
          gallery[currentImage].manufacturer.id,
          gallery[currentImage].model.id,
          gallery[currentImage].specificationId,
        );
      }
    };

    if (
      gallery.length === 0 ||
      preloadedImages.length === 0 ||
      (handlePromo && (promoGalleryLoadingStatus.isIdle || promoGalleryLoadingStatus.isLoading))
    ) {
      return <LoadingSpinner spinnerType="widget" />;
    }

    const useFavoriteList = (id: number) => {
      return favoritesList.find((element) => element.favorableId === gallery[id].specificationId)?.id;
    };

    const onLogin = () => {
      if (favoriteIdToAdd !== null) {
        handleFavorite(favoriteIdToAdd, true);
        setFavoriteIdToAdd(null);
      }
      setIsLogin(false);
    };

    const handleFavorite = (id: number, auth: boolean = isAuth) => {
      if (useFavoriteList(id)) {
        dispatch(resetMycarsFavoritesCountLoadingStatus());
        dispatch(deleteFavorite(useFavoriteList(id) as number));
        return;
      }

      if (auth) {
        dispatch(resetMycarsFavoritesCountLoadingStatus());
        dispatch(
          postFavorite({
            typeId: 1,
            favorableId: gallery[id || currentImage].specificationId,
          }),
        );
        return;
      }

      setFavoriteIdToAdd(id);
      dispatch(fetchHash());
      setIsLogin(true);
    };

    return (
      <div
        key={currentImage}
        className={classes.wrapper}
        {...handlers}
      >
        <div
          className={classes.background}
          // style={{
          //   backgroundImage: `url(${process.env.STATIC_URL || `${window.location.origin}/storage`}${
          //     gallery[currentImage].url.original
          //   })`,
          //   backgroundSize: "cover",
          // }}
        >
          <img
            src={preloadedImages[currentImage]}
            alt={`автомобиль ${name?.manufacturer} ${name?.model}`}
          />
        </div>

        <div className={classes.overlay}>
          <div>
            {gallery.length > 1 && (
              <GalleryPagination
                count={gallery.length}
                current={currentImage}
                onClick={setCurrentImage}
              />
            )}

            <div className={classes.nameWrapper}>
              <p>
                {name
                  ? `${name?.manufacturer} ${name?.model}`
                  : `${gallery[currentImage].manufacturer.name} ${gallery[currentImage].model.name}`}
              </p>

              <div className={classes.buttons}>
                {handlePromo && (
                  <button
                    aria-label="рассчитать"
                    onClick={handlePromoClick}
                  >
                    Рассчитать
                  </button>
                )}

                <button
                  aria-label="добавить в избранное"
                  className={classes.favorite}
                  onClick={() => handleFavorite(currentImage)}
                >
                  <svg
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref={useFavoriteList(currentImage) ? "#favorite-remove" : "#favorite-add"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={classes.controls}>
            {gallery.length > 1 && (
              <div className={classes.buttons}>
                <button
                  onClick={handlePrev}
                  aria-label="предыдущее изображение"
                >
                  <svg
                    width="9"
                    height="8"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#arrow-left" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  aria-label="следующее изображение"
                >
                  <svg
                    width="9"
                    height="8"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#arrow-right" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {isLogin && (
          <Login
            onClose={() => setIsLogin(false)}
            onLogin={onLogin}
          />
        )}
      </div>
    );
  },
);
