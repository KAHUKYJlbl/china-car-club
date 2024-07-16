import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { ApiFavoriteType } from '../../lib/types';

export const fetchFavorites = createAsyncThunk<
  ApiFavoriteType,
  number | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/fetchFavorites',
  async ( page, {extra: axios}) => {
    try {
      const { data } = await axios.get<ApiFavoriteType>(APIRoute.GetFavorites, { params: { page } });

      return data;
    } catch (err) {
      throw Error('Unable to get Favorites');
    }
  },
);
