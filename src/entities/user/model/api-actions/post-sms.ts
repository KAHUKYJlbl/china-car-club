import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { SmsType } from '../../lib/types';


export const postSms = createAsyncThunk<
  void,
  SmsType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/postSms',
  async ( smsData, {extra: axios}) => {
    try {
      await axios.post(APIRoute.AuthSms, smsData);
    } catch (err) {
      throw Error('Unable to post Sms');
    }
  },
);
