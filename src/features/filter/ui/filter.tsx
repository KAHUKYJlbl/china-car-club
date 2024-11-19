import { memo, useState } from "react";
import cn from "classnames";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { resetFiltersStatus } from "../../../entities/manufacturer";
import { getDealerName } from "../../../entities/settings";
import { FILTERS, FILTERS_ROLF } from "../../../app/settings/filters";

import useActiveFilters from "../lib/hooks/use-active-filters";
import { FilterId } from "../lib/types";
import classes from "./filter.module.sass";

type FolterProps = {
  isNewFilters?: boolean;
  activeFilters: Partial<Record<FilterId, number[]>>;
  setActiveFilters: React.Dispatch<React.SetStateAction<Partial<Record<FilterId, number[]>>>>;
};

export const Filter = memo(({ activeFilters, setActiveFilters, isNewFilters = false }: FolterProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [currentFilter, setCurrentFilter] = useState(Object.keys(FILTERS)[0] as FilterId);
  const isActiveFilters = useActiveFilters(activeFilters);
  const dealer = useAppSelector(getDealerName);
  const filters = dealer.toLowerCase().includes("рольф") ? FILTERS_ROLF : FILTERS;

  const handleActiveFiltersClick = (filter: FilterId, elementId: number) => {
    const newFilters = {
      ...activeFilters,
      [filter]: activeFilters[filter]
        ? activeFilters[filter]?.includes(elementId)
          ? activeFilters[filter]?.filter((element) => element !== elementId)
          : activeFilters[filter]?.concat(elementId)
        : [elementId],
    };

    dispatch(resetFiltersStatus());
    setActiveFilters((current) => ({
      ...current,
      ...newFilters,
    }));
  };

  const handleClearFilterClick = (currentFilter: FilterId) => {
    let newFilters: Partial<Record<FilterId, number[]>>;

    if (currentFilter === "other") {
      newFilters = {
        ...activeFilters,
        seats: [],
        powerReserve: [],
        acceleration: [],
        date: [],
        clearance: [],
      };
    } else {
      newFilters = {
        ...activeFilters,
        [currentFilter]: [],
      };
    }

    dispatch(resetFiltersStatus());
    setActiveFilters((current) => ({
      ...current,
      ...newFilters,
    }));
  };

  const handleClearAllFiltersClick = () => {
    const newFilters = {};

    dispatch(resetFiltersStatus());
    setActiveFilters(newFilters);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.headerRow}>
        <p>Фильтр автомобилей</p>

        {isActiveFilters && (
          <div className={classes.buttonWrapper}>
            <button
              aria-label="очистить все фильтры"
              className={classes.xButton}
              onClick={handleClearAllFiltersClick}
            >
              <svg
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#x" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className={classes.row}>
        {Object.entries(filters)
          .filter((filter) => filter[1].isNew || !isNewFilters)
          .map((filter) => (
            <button
              aria-label={filters[filter[0] as FilterId]?.name}
              key={filter[0]}
              className={cn(classes.filterButton, {
                [classes.active]: filter[0] === currentFilter,
              })}
              onClick={() => setCurrentFilter(filter[0] as FilterId)}
            >
              {filters[filter[0] as FilterId]?.name}

              {((activeFilters[filter[0] as FilterId] !== undefined &&
                activeFilters[filter[0] as FilterId]?.length !== 0) ||
                (filter[0] === "other" &&
                  filters.other?.elements.some(
                    (element) =>
                      element.filterId &&
                      activeFilters[element.filterId] &&
                      activeFilters[element.filterId]?.length !== 0,
                  ))) && <div className={classes.activeFilter} />}
            </button>
          ))}
      </div>

      <div className={classes.row}>
        {filters[currentFilter]?.elements.map((element) => (
          <button
            aria-label={element.name}
            key={element.elementId}
            className={cn(
              classes.filterElementButton,
              {
                [classes.active]: activeFilters[currentFilter]?.includes(element.elementId),
              },
              {
                [classes.active]:
                  currentFilter === "other" &&
                  element.filterId &&
                  activeFilters[element.filterId]?.some((filter) => filter === element.elementId),
              },
            )}
            onClick={() => handleActiveFiltersClick(element.filterId || currentFilter, element.elementId)}
          >
            {element.name}
          </button>
        ))}

        {((activeFilters[currentFilter] && activeFilters[currentFilter]?.length !== 0) ||
          (currentFilter === "other" &&
            FILTERS.other?.elements.some(
              (element) =>
                element.filterId && activeFilters[element.filterId] && activeFilters[element.filterId]?.length !== 0,
            ))) && (
          <button
            aria-label="очистить фильтры этого типа"
            className={classes.xButton}
            onClick={() => handleClearFilterClick(currentFilter)}
          >
            <svg
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#x" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});
