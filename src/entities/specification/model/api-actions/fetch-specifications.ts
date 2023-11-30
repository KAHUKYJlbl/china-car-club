import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';
import { ManufacturersWithSpecificationsType, SpecificationType } from '../../lib/types';


export const fetchSpecifications = createAsyncThunk<SpecificationType[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Specifications/fetchSpecifications',
  async (modelId, {extra: axios}) => {
    try {
      const { data: { specificationsBySeriesId } } = await axios.get<ManufacturersWithSpecificationsType>(APIRoute.Filters + APIRoute.Specifications + modelId);

      return specificationsBySeriesId;
    } catch (err) {
      throw Error('Unable to fetch Manufacturers');
    }
  },
);
