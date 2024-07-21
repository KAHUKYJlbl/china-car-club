import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { FavoriteByIdApiType, FavoriteRequestType } from '../../lib/types';

export const postFavorite = createAsyncThunk<
  FavoriteByIdApiType,
  FavoriteRequestType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/postFavorite',
  async ( reqData, {extra: axios}) => {
    try {
      const { data } = await axios.post<{id: number}>(APIRoute.AddFavorite, reqData);

      return {
        typeId: reqData.typeId,
        id: data.id,
        favorableId: reqData.favorableId
      };
    } catch (err) {
      throw Error('Unable to post Favorite');
    }
  },
);
