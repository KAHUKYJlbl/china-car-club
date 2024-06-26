import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { MycarsType } from '../../lib/types';


export const fetchMycars = createAsyncThunk<
  MycarsType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Statistics/fetchMycars',
  async ( _arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<MycarsType>(APIRoute.GetMycars);

      return data;
    } catch (err) {
      throw Error('Unable to get Mycars');
    }
  },
);
