import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { ApiOrderType } from '../../lib/types';



export const fetchOrders = createAsyncThunk<
  ApiOrderType,
  number | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/fetchOrders',
  async ( page = 1, {extra: axios}) => {
    try {
      const { data } = await axios.get<ApiOrderType>(APIRoute.GetOrders, { params: { page } });

      return data;
    } catch (err) {
      throw Error('Unable to get Orders');
    }
  },
);
