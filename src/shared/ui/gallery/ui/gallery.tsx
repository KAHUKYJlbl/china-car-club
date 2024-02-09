import { memo, useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import PROMO_GALLERY from '../../../../app/settings/gallery';
import { useAppSelector } from '../../../lib/hooks/use-app-selector';
import { getManufacturerByModel, getName } from '../../../../entities/manufacturer';
import { getSpecificationImgLoadingStatus } from '../../../../entities/specification';
import { LoadingSpinner } from '../../loading-spinner';

import { GalleryPagination } from './gallery-pagination';
import { GalleryType } from '../lib/types';
import classes from './gallery.module.sass';

type GalleryProps = {
  handlePromo?: ((promoManufacturer: number, promoModel: number, promoSpecification: number) => void);
  galleryList: {
    specificationId: number | null,
    modelId: number | null,
    list?: {big: string, original: string}[],
  };
}

export const Gallery = memo(
  ({ galleryList, handlePromo }: GalleryProps): JSX.Element => {
    const [ currentImage, setCurrentImage ] = useState(0);
    const [ gallery, setGallery ] = useState<GalleryType[] | null>(null);
    const name = useAppSelector((state) => getName(state, gallery && gallery[currentImage].modelId));
    const manufacturerId = useAppSelector((state) => getManufacturerByModel(state, gallery && gallery[currentImage].modelId));
    const specificationImgLoadingStatus = useAppSelector(getSpecificationImgLoadingStatus);

    const handlers = useSwipeable({
      onSwipedLeft: handleNext,
      onSwipedRight: handlePrev,
    });

    useEffect(() => {
      setCurrentImage(0);
    }, [galleryList.specificationId]);

    useEffect(() => {
      if (galleryList.specificationId && galleryList.modelId && galleryList.list) {
        setGallery(galleryList.list.map((url) => ({
            specificationId: galleryList.specificationId as number,
            modelId: galleryList.modelId as number,
            url,
        })));
      } else {
        setGallery(PROMO_GALLERY);
      }
    }, [galleryList.specificationId]);

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

    const handlePagination = useCallback( setCurrentImage, [] );

    const handlePromoClick = () => {
      if (handlePromo && manufacturerId && gallery) {
        handlePromo(manufacturerId, gallery[currentImage].modelId, gallery[currentImage].specificationId);
      }
    }

    if (!gallery) {
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
          {
            !specificationImgLoadingStatus.isLoading &&
            <img src={`${process.env.STATIC_URL}${gallery[currentImage].url.big}`} />
          }
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
              {`${name?.manufacturer} ${name?.model}`}
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
              !galleryList.specificationId &&
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
