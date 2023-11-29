import cn from 'classnames';

import classes from './gallery-pagination.module.sass';

type GalleryPaginationProps = {
  count: number;
  current: number;
  onClick: React.Dispatch<React.SetStateAction<number>>;
}

export const GalleryPagination = ({ count, current, onClick }: GalleryPaginationProps): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      {
        Array(count).fill('').map((value, index) => (
          <div
            className={ cn(classes.bar, {[classes.current]: index === current}) }
            onClick={() => onClick(index)}
            key={ value + index }
          />
        ))
      }
    </div>
  )
}
