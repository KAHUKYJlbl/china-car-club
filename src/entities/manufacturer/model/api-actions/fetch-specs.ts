import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';
import { FilterId } from '../../../../features/filter/lib/types';

import { ManufacturersWithSpecsCountType } from '../../lib/types';
import { getFiltersQuery } from '../../lib/get-filters-query';

export const fetchManufacturersWithSpectsCount = createAsyncThunk<
  ManufacturersWithSpecsCountType,
  {
    manufacturerId: number;
    filters: Partial< Record< FilterId, number[] > >
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Manufacturer/fetchManufacturersWithSpecsCount',
  async ({ manufacturerId , filters}, {extra: axios}) => {
    try {
      const { data } = await axios.get<ManufacturersWithSpecsCountType>(APIRoute.Filters + APIRoute.Models + manufacturerId + '&' + getFiltersQuery(filters));

      return data;
    } catch (err) {
      throw Error('Unable to fetch Manufacturers with Specs');
    }
  },
);
