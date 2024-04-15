import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { OrderType } from '../../lib/types';

export const postOrder = createAsyncThunk<
  void,
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
      await axios.post(APIRoute.PostOrder, order)
    } catch (err) {
      throw Error('Unable to post statistics');
    }
  },
);
