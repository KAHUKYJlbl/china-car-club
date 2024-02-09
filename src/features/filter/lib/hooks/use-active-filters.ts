import { FilterId } from '../types';

const useActiveFilters = (activeFilters: Partial< Record< FilterId, number[] > >) => {
  const filtersArray = Object.values(activeFilters);
  let isActiveFilters = false;

  if ( filtersArray.length !== 0 ) {
    filtersArray.forEach(( filters ) => {
      if (filters.length !== 0) {
        isActiveFilters = true;
      }
    });
  };

  return isActiveFilters;
};

export default useActiveFilters;
