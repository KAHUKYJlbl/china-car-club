import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { MycarsCalculationType } from '../../lib/types';


export const fetchCalculations = createAsyncThunk<
MycarsCalculationType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Statistics/fetchCalculations',
  async ( _arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<MycarsCalculationType>(APIRoute.GetCalculations);

      return data;
    } catch (err) {
      throw Error('Unable to get Calculations');
    }
  },
);
