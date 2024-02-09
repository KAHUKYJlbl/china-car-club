import { memo, useState } from 'react';
import cn from 'classnames';

import useActiveFilters from '../lib/hooks/use-active-filters';
import { FILTERS } from '../../../app/settings/filters';
import { FilterId } from '../lib/types';
import classes from './filter.module.sass';

type FolterProps = {
  activeFilters: Partial< Record< FilterId, number[] > >;
  setActiveFilters: React.Dispatch<React.SetStateAction<Partial<Record<FilterId, number[]>>>>;
}

export const Filter = memo(
  ({ activeFilters, setActiveFilters }: FolterProps): JSX.Element => {
    const [ currentFilter, setCurrentFilter ] = useState(Object.keys(FILTERS)[0] as FilterId);
    const isActiveFilters = useActiveFilters(activeFilters);

    const handleActiveFiltersClick = (filter: FilterId, elementId: number) => {
      const newFilters = {
        ...activeFilters,
        [filter]:
          activeFilters[filter]
            ? activeFilters[filter]?.includes(elementId)
              ? activeFilters[filter]?.filter((element) => element !== elementId)
              : activeFilters[filter]?.concat(elementId)
            : [elementId]
      };

      setActiveFilters((current) => ({
        ...current,
        ...newFilters
      }));
    };

    const handleClearFilterClick = (currentFilter: FilterId) => {
      let newFilters: Partial<Record<FilterId, number[]>>;

      if (currentFilter === 'other') {
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

      setActiveFilters((current) => ({
        ...current,
        ...newFilters
      }));
    }

    const handleClearAllFiltersClick = () => {
      const newFilters = {};

      setActiveFilters(newFilters);
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.headerRow}>
          <p>Фильтр автомобилей</p>

          {
            isActiveFilters &&
            <div className={classes.buttonWrapper}>
              <button className={classes.xButton} onClick={handleClearAllFiltersClick}>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#x" />
                </svg>
              </button>
            </div>
          }
        </div>

        <div className={classes.row}>
          {
            Object.keys(FILTERS).map((filter) => (
              <div
                key={filter}
                className={cn(classes.filterButton, {[classes.active]: filter === currentFilter})}
                onClick={() => setCurrentFilter(filter as FilterId)}
              >
                { FILTERS[filter as FilterId]?.name }

                {
                  ((
                    activeFilters[filter as FilterId] !== undefined
                    && activeFilters[filter as FilterId]?.length !== 0
                  )
                  || (filter === 'other' && FILTERS.other?.elements.some((element) => (
                    element.filterId
                    && activeFilters[element.filterId]
                    && ( activeFilters[element.filterId]?.length !== 0 )
                  ))))
                  && <div className={classes.activeFilter} />
                }
              </div>
            ))
          }
        </div>

        <div className={classes.row}>
          {
            FILTERS[currentFilter]?.elements.map((element) => (
              <div
                key={element.elementId}
                className={cn(
                  classes.filterElementButton,
                  { [classes.active]: activeFilters[currentFilter]?.includes( element.elementId ) },
                  { [classes.active]:
                    (
                      currentFilter === 'other'
                      && element.filterId
                      && activeFilters[element.filterId]?.some((filter) => filter === element.elementId)
                    )
                  }
                )}
                onClick={() => handleActiveFiltersClick(element.filterId || currentFilter, element.elementId)}
              >
                { element.name }
              </div>
            ))
          }

          {
            ((activeFilters[currentFilter] && activeFilters[currentFilter]?.length !== 0) ||
            (currentFilter === 'other' && FILTERS.other?.elements.some((element) => (
              element.filterId
              && activeFilters[element.filterId]
              && ( activeFilters[element.filterId]?.length !== 0 )
            )))) &&
            <button className={classes.xButton} onClick={() => handleClearFilterClick(currentFilter)}>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#x" />
              </svg>
            </button>
          }
        </div>
      </div>
    )
  }
);
