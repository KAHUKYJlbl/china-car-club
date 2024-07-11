import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { OrderResponseType, OrderType } from '../../lib/types';

export const postOrder = createAsyncThunk<
  number,
  OrderType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Statistics/postOrder',
  async ( order, {extra: axios}) => {
    try {
      const { data } = await axios.post<OrderResponseType>(APIRoute.PostOrder, order)

      return data.id
    } catch (err) {
      throw Error('Unable to post order');
    }
  },
);
