import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { ManufacturersType } from '../../lib/types';

export const fetchManufacturers = createAsyncThunk<ManufacturersType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Manufacturer/getManufacturers',
  async (_arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<ManufacturersType>(APIRoute.Catalog);

      return data;
    } catch (err) {
      throw Error('Unable to fetch Manufacturers');
    }
  },
);
