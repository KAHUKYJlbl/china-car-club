import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../../../../app/provider/store';
import { GalleryApiType } from '../../lib/types';
import { APIRoute } from '../../../../shared/api/routes';

export const fetchPromo = createAsyncThunk<
GalleryApiType[],
  void,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
> (
  'Gallery/fetchPromo',
  async ( _arg, {extra: axios}) => {
    try {
      const { data } = await axios.get<{data: GalleryApiType[]}>(APIRoute.PromoGallery);
      return data.data;
    } catch (err) {
      throw Error('Unable to fetch Promo');
    }
  },
);
