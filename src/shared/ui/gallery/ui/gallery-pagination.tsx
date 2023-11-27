import classes from './gallery-pagination.module.sass';

type GalleryPaginationProps = {
  count: number;
}

export const GalleryPagination = ({ count }: GalleryPaginationProps): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      {
        Array(count).fill('').map((value, index) => (
          <div className={classes.bar} key={value + index} />
        ))
      }
    </div>
  )
}
