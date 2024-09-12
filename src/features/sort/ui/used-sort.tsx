import { SortItemType } from "../lib/types";
import classes from "./used-sort.module.sass";

type UsedSortProps = {
  sortItems: SortItemType[];
  currentSort: number;
  setCurrentSort: React.Dispatch<React.SetStateAction<number>>;
};

export const UsedSort = ({ sortItems }: UsedSortProps) => {
  return (
    <div className={classes.wrapper}>
      <h3 className={classes.header}>Сортировка преложений</h3>

      <ul>
        {sortItems.map((sortItem) => (
          <li>{sortItem.name}</li>
        ))}
      </ul>

      <button>Применить</button>
    </div>
  );
};
