import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { fetchFiltered, getFiltersLoadingStatus, getManufacturersLoadingStatus } from "../../../entities/manufacturer";
import { Filter, FilterId } from "../../../features/filter";
import { ChooseUsedModel } from "../../../features/choose-used-model";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";

import classes from "./used-list.module.sass";

type UsedListProps = {};

export const UsedList = ({}: UsedListProps) => {
  const dispatch = useAppDispatch();
  const [activeFilters, setActiveFilters] = useState<Partial<Record<FilterId, number[]>>>({});
  const [currentManufacturer, setCurrentManufacturer] = useState<number | null>(null);
  const [currentModel, setCurrentModel] = useState<number | null>(null);
  const [currentSpecification, setCurrentSpecification] = useState<number | null>(null);
  const [filtersToFetch] = useDebounce(activeFilters, 650);

  const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
  const filtersLoadingStatus = useAppSelector(getFiltersLoadingStatus);

  useEffect(() => {
    if (filtersLoadingStatus.isIdle && manufacturersLoadingStatus.isSuccess) {
      dispatch(fetchFiltered(filtersToFetch));
    }
  }, [filtersToFetch]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.filter}>
        <Filter
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </div>

      <div className={classes.sort}>
        <svg
          className={classes.grey}
          width={12}
          height={14}
          aria-hidden="true"
        >
          <use xlinkHref="#sort" />
        </svg>

        <p className={classes.grey}>Сортировка:</p>

        <p>Сначала мин. пробег</p>
      </div>

      <div className={classes.model}>
        <ChooseUsedModel
          currentManufacturer={currentManufacturer}
          setCurrentManufacturer={setCurrentManufacturer}
          currentModel={currentModel}
          setCurrentModel={setCurrentModel}
          currentSpecification={currentSpecification}
          setCurrentSpecification={setCurrentSpecification}
          activeFilters={activeFilters}
        />
      </div>

      <div className={classes.list}>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    </div>
  );
};
