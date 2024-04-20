import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { GalleryType } from '../lib/types';
import { fetchPromo } from './api-actions/fetch-promo';


type InitialState = {
  promoGallery: GalleryType[];
  promoGalleryLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  promoGallery: [],
  promoGalleryLoadingStatus: FetchStatus.Idle,
};

export const gallerySlice = createSlice({
  name: NameSpace.Specification,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.promoGallery = action.payload.map((promo) => ({
          specificationId: promo.id,
          model: {
            name: promo.series.name.ru || promo.series.name.ch,
            id: promo.series.id,
          },
          manufacturer: {
            name: promo.manufacturer.name.ru || promo.manufacturer.name.ch,
            id: promo.manufacturer.id,
          },
          url: promo.imageUrls,
        }))
        state.promoGalleryLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchPromo.pending, (state) => {
        state.promoGalleryLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.promoGalleryLoadingStatus = FetchStatus.Failed;
      });
  },
});
