import { memo, useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { getName } from '../../../entities/manufacturer';
import { ImgUrlType } from '../../../entities/specification';

import { GalleryPagination } from './gallery-pagination';
import { getPromoGallery, getPromoGalleryLoadingStatus } from '../model/gallery-selectors';
import { GalleryType } from '../lib/types';
import classes from './gallery.module.sass';

type GalleryProps = {
  handlePromo?: ((promoManufacturer: number, promoModel: number, promoSpecification: number) => void) | null;
  manufacturerId: number | null | undefined;
  specificationId: number | null;
  modelId: number | null;
  galleryList?: ImgUrlType[];
  initSlide?: number;
}

export const Gallery = memo(
  ({ specificationId, modelId, manufacturerId, galleryList, handlePromo, initSlide = 0 }: GalleryProps): JSX.Element => {
    const [ currentImage, setCurrentImage ] = useState(initSlide);
    const [ preloadedImages, setPreloadedImages ] = useState<string[]>([]);
    const [ gallery, setGallery ] = useState<GalleryType[]>([]);
    const name = useAppSelector((state) => getName(state, modelId));
    const promoGallery = useAppSelector(getPromoGallery);
    const promoGalleryLoadingStatus = useAppSelector(getPromoGalleryLoadingStatus);

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
        setGallery(galleryList.map((url) => ({
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
        })));
      }

      if (handlePromo) {
        setGallery(promoGallery);
      }
    }, [specificationId, galleryList, promoGallery.length]);

    useEffect(() => {
      const promises = gallery.map((image) =>
        new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.src = `${process.env.STATIC_URL}${image.url.big}`;
          img.onload = () => resolve(`${process.env.STATIC_URL}${image.url.big}`);
          img.onerror = () => reject();
        })
      );

      const preload = async () => {
        const images = await Promise.all(promises);

        setPreloadedImages(images);
      };

      preload();
    }, [gallery]);


    function handleNext () {
      setCurrentImage((current) =>
        current + 1 === gallery!.length
        ? 0
        : current + 1
      )
    };

    function handlePrev () {
      setCurrentImage((current) =>
        current === 0
        ? gallery!.length - 1
        : current - 1
      )
    };

    function handlePage (page: number) {
      setCurrentImage(page);
    }

    const handlePagination = useCallback( handlePage, [] );

    const handlePromoClick = () => {
      if (handlePromo && gallery) {
        handlePromo(gallery[currentImage].manufacturer.id, gallery[currentImage].model.id, gallery[currentImage].specificationId);
      }
    }

    if (
      gallery.length === 0
      || preloadedImages.length === 0
      || handlePromo && (promoGalleryLoadingStatus.isIdle || promoGalleryLoadingStatus.isLoading)
    ) {
      return <LoadingSpinner spinnerType='widget' />
    }

    return (
      <div
        key={currentImage}
        className={classes.wrapper}
        {...handlers}
      >
        <div
          className={classes.background}
          style={{
            backgroundImage: `url(${process.env.STATIC_URL}${gallery[currentImage].url.original})`,
            backgroundSize: "cover"
          }}
        >
          <img src={preloadedImages[currentImage]} />
        </div>

        <div className={classes.overlay}>
          <div>
            {
              gallery.length > 1 &&
              <GalleryPagination
                count={gallery.length}
                current={currentImage}
                onClick={handlePagination}
              />
            }

            <p>
              {
                name
                ? `${name?.manufacturer} ${name?.model}`
                : `${gallery[currentImage].manufacturer.name} ${gallery[currentImage].model.name}`
              }
            </p>
          </div>

          <div className={classes.controls}>
            {
              gallery.length > 1 &&
              <div className={classes.arrows}>
                <button onClick={handlePrev}>
                  <svg width="9" height="8" aria-hidden="true">
                    <use xlinkHref="#arrow-left" />
                  </svg>
                </button>

                <button onClick={handleNext}>
                  <svg width="9" height="8" aria-hidden="true">
                    <use xlinkHref="#arrow-right" />
                  </svg>
                </button>
              </div>
            }

            {
              handlePromo &&
              <button onClick={handlePromoClick}>
                Рассчитать спеццену
              </button>
            }
          </div>
        </div>
      </div>
    )
  }
);
