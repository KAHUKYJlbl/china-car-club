import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { ModelApiType } from '../../lib/types';
import { generatePath } from 'react-router-dom';

export const fetchModel = createAsyncThunk<ModelApiType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Model/fetchModel',
  async (modelId, {extra: axios}) => {
    try {
      const { data } = await axios.get<ModelApiType>( generatePath( APIRoute.Model, {id: modelId} ) );

      return data;
    } catch (err) {
      throw Error('Unable to fetch Model');
    }
  },
);
