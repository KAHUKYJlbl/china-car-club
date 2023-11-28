import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';
import { FilterId } from '../../../../features/filter';

import { ManufacturersType } from '../../lib/types';

export const fetchFiltered = createAsyncThunk<ManufacturersType, Partial<Record<FilterId, number[]>>, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Manufacturer/fetchFiltered',
  async (filters, {extra: axios}) => {
    const filtersQuery: string = Object.keys(filters)
      .map((filterId) =>
        filters[filterId as FilterId]
          ? filters[filterId as FilterId]
            ?.map((elementId) => `filter[${filterId}][]=${elementId}`)
            .join('&')
          : ''
      ).join('&');

    try {
      const { data } = await axios.get<ManufacturersType>(`${APIRoute.Filters}${filtersQuery}`);

      return data;
    } catch (err) {
      throw Error('Unable to fetch Manufacturers');
    }
  },
);
