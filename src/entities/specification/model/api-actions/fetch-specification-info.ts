import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import queryString from 'query-string';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';
import { FilterId } from '../../../../features/filter';
import { getFiltersQuery } from '../../../manufacturer';

import { ManufacturersWithSpecificationsType, SpecificationType } from '../../lib/types';


export const fetchSpecificationsInfo = createAsyncThunk<
  SpecificationType[],
  {
    modelId: number;
    filters: Partial< Record< FilterId, number[] > >;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Specifications/fetchSpecificationsInfo',
  async ( { modelId, filters }, {extra: axios}) => {
    try {
      const { data: { specificationsBySeriesId } } = await axios.get<ManufacturersWithSpecificationsType>([
        APIRoute.Catalog,
        queryString.stringifyUrl({
          url: '',
          query: {seriesId: modelId},
        }),
        '&',
        getFiltersQuery(filters),
      ].join(''));

      return specificationsBySeriesId;
    } catch (err) {
      throw Error('Unable to fetch Manufacturers');
    }
  },
);
