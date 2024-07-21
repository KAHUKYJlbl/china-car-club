import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { UserType } from '../../lib/types';


export const fetchHash = createAsyncThunk<
  UserType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/fetchHash',
  async ( _arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<UserType>(APIRoute.AuthHash);

      return data;
    } catch (err) {
      throw Error('Unable to fetch Auth Hash');
    }
  },
);
