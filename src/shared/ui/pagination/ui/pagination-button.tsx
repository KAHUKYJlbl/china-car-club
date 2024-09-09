import cn from "classnames";

import classes from "./pagination-button.module.sass";

type PaginationButtonProps = {
  page: number;
  callback?: (arg: number) => void;
  isCurrent?: boolean;
};

export const PaginationButton = ({ page, callback, isCurrent = false }: PaginationButtonProps) => {
  const clickHandler = (page: number) => {
    if (callback) {
      callback(page);
    }
  };

  return (
    <div
      className={cn(classes.wrapper, {
        [classes.disabled]: !page,
        [classes.current]: isCurrent,
      })}
      onClick={() => clickHandler(page)}
    >
      {page || "..."}
    </div>
  );
};
