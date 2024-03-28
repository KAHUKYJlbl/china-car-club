import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';
import { StatisticsType } from '../../../../features/choose-delivery/lib/types';

export const postStatistics = createAsyncThunk<
  void,
  StatisticsType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Statistics/postStatistics',
  async ( statistics, {extra: axios}) => {
    try {
      await axios.post(APIRoute.PostStatistics, statistics)
    } catch (err) {
      throw Error('Unable to post statistics');
    }
  },
);
