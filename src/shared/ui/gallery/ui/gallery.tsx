import { memo, useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { GalleryPagination } from './gallery-pagination';
import classes from './gallery.module.sass';
import PROMO_GALLERY from '../../../../app/settings/gallery';

type GalleryProps = {
  isPromo?: boolean;
  specificationId?: number | null;
}

export const Gallery = memo(
  ({ specificationId, isPromo = false }: GalleryProps): JSX.Element => {
    const [ currentImage, setCurrentImage ] = useState(0);
    const [ gallery, setGallery ] = useState(PROMO_GALLERY);
    const handlers = useSwipeable({
      onSwipedLeft: handleNext,
      onSwipedRight: handlePrev,
    });

    useEffect(() => {
      setCurrentImage(0);
    }, [specificationId]);

    useEffect(() => {
      if (specificationId) {
        setGallery([specificationId]);
      } else {
        setGallery(PROMO_GALLERY);
      }
    }, [specificationId]);

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

    return (
      <div
        key={currentImage}
        className={classes.wrapper}
        {...handlers}
      >
        <div className={classes.background} >
          <img src={`${process.env.STATIC_URL}specification/${gallery[currentImage]}.jpg`} />
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
              LiXiang L9
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
              isPromo &&
              <button>
                Рассчитать спеццену
              </button>
            }
          </div>
        </div>
      </div>
    )
  }
);
