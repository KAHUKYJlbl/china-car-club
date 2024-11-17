import { memo, useEffect } from "react";
import cn from "classnames";

import classes from "./gallery-pagination.module.sass";

type GalleryPaginationProps = {
  count: number;
  current: number;
  onClick: (arg: number) => void;
};

export const GalleryPagination = memo(({ count, current, onClick }: GalleryPaginationProps): JSX.Element => {
  useEffect(() => {
    const timeout = setTimeout(() => onClick(current + 1 === count ? 0 : current + 1), 10100);

    return () => clearTimeout(timeout);
  }, [current]);

  return (
    <div className={classes.wrapper}>
      {Array(count)
        .fill("")
        .map((value, index) => (
          <div
            className={cn(classes.bar, {
              [classes.past]: index < current,
            })}
            onClick={() => onClick(index)}
            key={value + index}
          >
            {index === current && <div className={classes.current} />}
          </div>
        ))}
    </div>
  );
});
