import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { MycarsCalculationType } from '../../lib/types';


export const fetchCalculations = createAsyncThunk<
MycarsCalculationType,
  number | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Statistics/fetchCalculations',
  async ( page, {extra: axios}) => {
    try {
      const { data } = await axios.get<MycarsCalculationType>(APIRoute.GetCalculations, {params: { page }});

      return data;
    } catch (err) {
      throw Error('Unable to get Calculations');
    }
  },
);
