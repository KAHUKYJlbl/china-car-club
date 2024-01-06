import { memo, useCallback, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { GalleryPagination } from './gallery-pagination';
import classes from './gallery.module.sass';

const IMAGES_COUNT = 6;
const IMAGES_NAMES = Array<string>(IMAGES_COUNT).fill('').map(( e, i ) => e + i)

type GalleryProps = {
  isPromo?: boolean;
  specificationId: number | null;
}

export const Gallery = memo(
  ({ isPromo = false, specificationId }: GalleryProps): JSX.Element => {
    const [ currentImage, setCurrentImage ] = useState(0);
    const handlers = useSwipeable({
      onSwipedLeft: handleNext,
      onSwipedRight: handlePrev,
    });

    function handleNext () {
      setCurrentImage((current) =>
        current + 1 === IMAGES_NAMES.length
        ? 0
        : current + 1
      )
    };

    function handlePrev () {
      setCurrentImage((current) =>
        current === 0
        ? IMAGES_NAMES.length - 1
        : current - 1
      )
    };

    const handlePagination = useCallback(
      setCurrentImage,
      []
    );

    return (
      <div
        key={currentImage}
        className={classes.wrapper}
        {...handlers}
      >
        <div className={classes.background} >
          <img
            src={currentImage
              ? `${process.env.STATIC_URL}${specificationId}.jpg`
              : `/images/gallery/car-${currentImage + 1}.jpg`
            }
          />
        </div>

        <div className={classes.overlay}>
          <div>
            <GalleryPagination
              count={IMAGES_COUNT}
              current={currentImage}
              onClick={handlePagination}
            />

            <p>
              LiXiang L9
            </p>
          </div>

          <div className={classes.controls}>
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
