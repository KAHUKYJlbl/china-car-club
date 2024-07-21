import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { APIRoute } from '../../../../shared/api/routes';

import { ApiFavoriteType } from '../../lib/types';

export const deleteFavorite = createAsyncThunk<
  number,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'User/deleteFavorite',
  async ( id, {extra: axios}) => {
    try {
      await axios.post<ApiFavoriteType>(APIRoute.DeleteFavorite, { id });

      return id;
    } catch (err) {
      throw Error('Unable to delete Favorite');
    }
  },
);
