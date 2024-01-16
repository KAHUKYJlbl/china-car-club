import { memo, useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import PROMO_GALLERY from '../../../../app/settings/gallery';
import { useAppSelector } from '../../../lib/hooks/use-app-selector';
import { getManufacturerByModel, getName } from '../../../../entities/manufacturer';

import { GalleryPagination } from './gallery-pagination';
import classes from './gallery.module.sass';

type GalleryProps = {
  handlePromo?: ((promoManufacturer: number, promoModel: number, promoSpecification: number) => void) | null;
  galleryId: {
    specificationId: number | null,
    modelId: number | null,
  };
}

export const Gallery = memo(
  ({ galleryId, handlePromo }: GalleryProps): JSX.Element => {
    const [ currentImage, setCurrentImage ] = useState(0);
    const [ gallery, setGallery ] = useState(PROMO_GALLERY);
    const name = useAppSelector((state) => getName(state, gallery[currentImage].modelId));
    const manufacturerId = useAppSelector((state) => getManufacturerByModel(state, gallery[currentImage].modelId));
    const handlers = useSwipeable({
      onSwipedLeft: handleNext,
      onSwipedRight: handlePrev,
    });

    useEffect(() => {
      setCurrentImage(0);
    }, [galleryId.specificationId]);

    useEffect(() => {
      if (galleryId.specificationId && galleryId.modelId) {
        setGallery([{
          specificationId: galleryId.specificationId,
          modelId: galleryId.modelId,
        }]);
      } else {
        setGallery(PROMO_GALLERY);
      }
    }, [galleryId.specificationId]);

    function handleNext () {
      setCurrentImage((current) =>
        current + 1 === gallery.length
        ? 0
        : current + 1
      )
    };

    function handlePrev () {
      setCurrentImage((current) =>
        current === 0
        ? gallery.length - 1
        : current - 1
      )
    };

    const handlePagination = useCallback( setCurrentImage, [] );

    const handlePromoClick = () => {
      if (handlePromo && manufacturerId) {
        handlePromo(manufacturerId, gallery[currentImage].modelId, gallery[currentImage].specificationId);
      }
    }

    return (
      <div
        key={currentImage}
        className={classes.wrapper}
        {...handlers}
      >
        <div className={classes.background} >
          <img src={`${process.env.STATIC_URL}specification/${gallery[currentImage].specificationId}.jpg`} />
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

{/* TODO: Add name */}
            <p>
              {name}
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

{/* TODO: Add redirect */}
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
