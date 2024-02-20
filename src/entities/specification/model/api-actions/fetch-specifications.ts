import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import queryString from 'query-string';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';
import { FilterId } from '../../../../features/filter';
import { getFiltersQuery } from '../../../manufacturer';

import { ManufacturersWithSpecificationsType, SpecificationType } from '../../lib/types';


export const fetchSpecifications = createAsyncThunk<
  SpecificationType[],
  {
    manufacturerId: number;
    modelId: number;
    filters: Partial< Record< FilterId, number[] > >;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Specifications/fetchSpecifications',
  async ( { modelId, filters, manufacturerId }, {extra: axios}) => {
    try {
      const { data: { specificationsBySeriesId } } = await axios.get<ManufacturersWithSpecificationsType>([
        APIRoute.Catalog,
        queryString.stringifyUrl({
          url: '',
          query: {
            manufacturerId: manufacturerId,
            seriesId: modelId,
          }
        }),
        '&',
        getFiltersQuery(filters),
      ].join(''));

      return specificationsBySeriesId;
    } catch (err) {
      throw Error('Unable to fetch Specification');
    }
  },
);
