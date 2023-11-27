import { useState } from 'react';
import cn from 'classnames';

import { FILTERS } from '../lib/filters';
import { FilterId } from '../lib/types';
import classes from './filter.module.sass';

export const Filter = (): JSX.Element => {
  const [ currentFilter, setCurrentFilter ] = useState(Object.keys(FILTERS)[0]);

  return (
    <div className={classes.wrapper}>
      <p>Фильтр автомобилей</p>

      <div className={classes.row}>
        {
          Object.keys(FILTERS).map((filter) => (
            <div
              key={filter}
              className={cn(classes.filterButton, {[classes.active]: filter === currentFilter})}
              onClick={() => setCurrentFilter(filter)}
            >
              { FILTERS[filter as FilterId].name }
            </div>
          ))
        }
      </div>
    </div>
  )
}
