import { useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import { FilterId } from '../../../../features/filter';
import { fetchFiltered } from '../../../../entities/manufacturer';
import { useAppDispatch } from '../../../../shared/lib/hooks/use-app-dispatch';

const useFilters = (filters: Partial<Record<FilterId, number[]>>, isPromo: boolean) => {
  const dispatch = useAppDispatch();
  const [ filtersToFetch ] = useDebounce(filters, 650);

  useEffect(() => {
    if (Object.entries(filtersToFetch).length !== 0 || isPromo) {
      dispatch(fetchFiltered(filtersToFetch));
    }
  }, [filtersToFetch]);
};

export default useFilters;
