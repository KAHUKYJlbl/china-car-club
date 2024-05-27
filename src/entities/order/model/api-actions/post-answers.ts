import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { AnswersType } from '../lib/types';


export const postAnswers = createAsyncThunk<
  void,
  AnswersType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Statistics/postAnswers',
  async ( answers, {extra: axios}) => {
    try {
      await axios.post(APIRoute.PostAnswers, answers)
    } catch (err) {
      throw Error('Unable to post answers');
    }
  },
);
