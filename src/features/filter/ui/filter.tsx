import { useState } from 'react';
import cn from 'classnames';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { fetchFiltered } from '../../../entities/manufacturer';

import { FILTERS } from '../lib/filters';
import { FilterId } from '../lib/types';
import classes from './filter.module.sass';

export const Filter = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [ currentFilter, setCurrentFilter ] = useState(Object.keys(FILTERS)[0] as FilterId);
  const [ activeFilters, setActiveFilters ] = useState< Partial<Record<FilterId, number[]>> >({});

  const handleActiveFiltersClick = (filter: FilterId, elementId: number) => {
    const newFilters = {
      ...activeFilters,
      [filter]: activeFilters[filter]
        ? activeFilters[filter]?.includes(elementId)
          ? activeFilters[filter]?.filter((element) => element !== elementId)
          : activeFilters[filter]?.concat(elementId)
        : [elementId]
    };

    setActiveFilters((current) => ({
      ...current,
      ...newFilters
    }));

    dispatch(fetchFiltered(newFilters));
  };

  return (
    <div className={classes.wrapper}>
      <p>Фильтр автомобилей</p>

      <div className={classes.row}>
        {
          Object.keys(FILTERS).map((filter) => (
            <div
              key={filter}
              className={cn(classes.filterButton, {[classes.active]: filter === currentFilter})}
              onClick={() => setCurrentFilter(filter as FilterId)}
            >
              { FILTERS[filter as FilterId].name }

              {
                activeFilters[filter as FilterId] !== undefined
                && activeFilters[filter as FilterId]?.length !== 0
                && <div className={classes.activeFilter} />}
            </div>
          ))
        }
      </div>

      <div className={classes.row}>
        {
          FILTERS[currentFilter].elements.map((element) => (
            <div
              key={element.elementId}
              className={cn(
                classes.filterElementButton,
                { [classes.active]: activeFilters[currentFilter]?.includes( element.elementId ) }
              )}
              onClick={() => handleActiveFiltersClick(currentFilter, element.elementId)}
            >
              { element.name }
            </div>
          ))
        }
      </div>
    </div>
  )
}
