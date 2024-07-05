import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { MycarsOrderType } from '../../lib/types';


export const fetchOrders = createAsyncThunk<
  MycarsOrderType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Statistics/fetchOrders',
  async ( _arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<MycarsOrderType>(APIRoute.GetOrders);

      return data;
    } catch (err) {
      throw Error('Unable to get Orders');
    }
  },
);
