import { SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames";

import { SortItemType } from "../lib/types";

import classes from "./used-sort.module.sass";

type UsedSortProps = {
  sortItems: SortItemType[];
  currentSort: string;
  setCurrentSort: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
};

export const UsedSort = ({ sortItems, currentSort, setCurrentSort, onSubmit }: UsedSortProps) => {
  const { register, watch, handleSubmit } = useForm<{ sort: string }>({ defaultValues: { sort: currentSort } });

  const submitHandler: SubmitHandler<{ sort: string }> = (data) => {
    setCurrentSort(data.sort);
    onSubmit();
  };

  return (
    <form
      className={classes.wrapper}
      onSubmit={handleSubmit(submitHandler)}
    >
      <h3 className={classes.header}>Сортировка преложений</h3>

      <ul className={classes.radio}>
        {sortItems.map((sortItem) => (
          <li key={sortItem.id}>
            <label className={cn(sortItem.id === watch("sort") && classes.checked)}>
              <div className={cn(sortItem.id === watch("sort") && classes.checked)}>
                {sortItem.id === watch("sort") && (
                  <svg
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#checked" />
                  </svg>
                )}

                <input
                  type="radio"
                  className="visually-hidden"
                  value={sortItem.id}
                  {...register("sort")}
                />
              </div>
              {sortItem.name}
            </label>
          </li>
        ))}
      </ul>

      <button
        type="submit"
        className={classes.saveButton}
      >
        Применить
      </button>
    </form>
  );
};
