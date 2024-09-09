import { getPaginationArray } from "../lib/utils/get-pagination-array";
import { PaginationButton } from "./pagination-button";
import classes from "./pagination.module.sass";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (arg: number) => void;
  pagesCount: number;
};

export const Pagination = ({ currentPage, setCurrentPage, pagesCount }: PaginationProps) => {
  return (
    <div className={classes.wrapper}>
      {currentPage > 2 && pagesCount > 3 && (
        <PaginationButton
          page={1}
          callback={setCurrentPage}
        />
      )}

      {currentPage > 3 && pagesCount > 4 && <PaginationButton page={0} />}

      {getPaginationArray(currentPage, pagesCount).map((page) => (
        <PaginationButton
          key={page}
          page={page}
          callback={setCurrentPage}
          isCurrent={page === currentPage}
        />
      ))}

      {pagesCount - currentPage > 2 && pagesCount > 4 && <PaginationButton page={0} />}

      {pagesCount - currentPage > 1 && pagesCount > 3 && (
        <PaginationButton
          page={pagesCount}
          callback={setCurrentPage}
        />
      )}
    </div>
  );
};
