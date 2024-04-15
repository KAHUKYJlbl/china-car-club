import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute } from '../../../../shared/api/routes';
import { AppDispatch, State } from '../../../../app/provider/store';
import { FilterId } from '../../../../features/filter';

import { ManufacturersWithSpecsCountType } from '../../lib/types';
import { getFiltersQuery } from '../../lib/get-filters-query';

export const fetchFiltered = createAsyncThunk<
  ManufacturersWithSpecsCountType,
  Partial< Record< FilterId, number[] > >,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Manufacturer/fetchFiltered',
  async (filters, {extra: axios}) => {
    try {
      const { data } = await axios.get<ManufacturersWithSpecsCountType>([
        APIRoute.Catalog,
        '?',
        getFiltersQuery(filters),
      ].join(''));

      return data;
    } catch (err) {
      throw Error('Unable to fetch Filtered Manufacturers');
    }
  },
);
