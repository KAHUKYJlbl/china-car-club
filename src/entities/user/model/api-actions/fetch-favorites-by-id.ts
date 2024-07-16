import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { FavoriteByIdRequestType, FavoriteByIdType } from '../../lib/types';

export const fetchFavoritesById = createAsyncThunk<
  FavoriteByIdType[],
  FavoriteByIdRequestType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/fetchFavoritesById',
  async ( requestData, {extra: axios}) => {
    try {
      const { data } = await axios.get<FavoriteByIdType[]>(APIRoute.GetFavoritesById, { params: requestData });

      return data;
    } catch (err) {
      throw Error('Unable to get Favorites by ID');
    }
  },
);
