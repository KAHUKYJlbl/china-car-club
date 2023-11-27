import { GalleryPagination } from './gallery-pagination';
import classes from './gallery.module.sass';

export const Gallery = (): JSX.Element => {
  return (
    <div
      className={classes.wrapper}
      style={{backgroundImage: "url('./src/assets/images/gallery/car.jpg')"}}
    >
      <div>
        <GalleryPagination count={6} />

        <p>
          LiXiang L9
        </p>
      </div>

      <div className={classes.controls}>
        <div className={classes.arrows}>
          <button>
            <svg width="9" height="8" aria-hidden="true">
              <use xlinkHref="#arrow-left" />
            </svg>
          </button>

          <button>
            <svg width="9" height="8" aria-hidden="true">
              <use xlinkHref="#arrow-right" />
            </svg>
          </button>
        </div>

        <button>
          Рассчитать спеццену
        </button>
      </div>
    </div>
  )
}
