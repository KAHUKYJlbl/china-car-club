import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { TokenType } from '../../lib/types';
import { setToken } from '../../../../shared/api/token';


export const postRefresh = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/postRefresh',
  async ( _arg, {extra: axios}) => {
    try {
      const { data } = await axios.post<TokenType>(APIRoute.AuthRefresh);
      setToken(data.accessToken);
    } catch (err) {
      throw Error('Unable to post Refresh');
    }
  },
);
