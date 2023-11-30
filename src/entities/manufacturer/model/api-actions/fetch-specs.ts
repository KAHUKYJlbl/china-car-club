import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { ManufacturersWithSpecsCountType } from '../../lib/types';

export const fetchManufacturersWithSpectsCount = createAsyncThunk<ManufacturersWithSpecsCountType, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Manufacturer/fetchManufacturersWithSpecsCount',
  async (manufacturerId, {extra: axios}) => {
    try {
      const { data } = await axios.get<ManufacturersWithSpecsCountType>(APIRoute.Filters + APIRoute.Models + manufacturerId);

      return data;
    } catch (err) {
      throw Error('Unable to fetch Manufacturers with Specs');
    }
  },
);
