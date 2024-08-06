import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { ApiFavoriteType } from '../../lib/types';

export const fetchFavoritesCount = createAsyncThunk<
  number,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/fetchFavoritesCount',
  async ( _arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<ApiFavoriteType>(APIRoute.GetFavorites);

      return data.meta.total;
    } catch (err) {
      throw Error('Unable to get Favorites Count');
    }
  },
);
