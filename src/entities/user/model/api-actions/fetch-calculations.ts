import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { ApiCalculationType } from '../../lib/types';

export const fetchCalculations = createAsyncThunk<
ApiCalculationType,
  number | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/fetchCalculations',
  async ( page, {extra: axios}) => {
    try {
      const { data } = await axios.get<ApiCalculationType>(APIRoute.GetCalculations, {params: { page }});

      return data;
    } catch (err) {
      throw Error('Unable to get Calculations');
    }
  },
);
