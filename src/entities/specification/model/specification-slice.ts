import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { SpecificationImageType, SpecificationType } from '../lib/types';
import { fetchSpecifications } from './api-actions/fetch-specifications';
import { fetchSpecificationsInfo } from './api-actions/fetch-specification-info';
import { fetchSpecificationsImage } from './api-actions/fetch-specification-image';

type InitialState = {
  specifications: SpecificationType[];
  specificationImg: SpecificationImageType;
  specificationsLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  specifications: [],
  specificationImg: {
    external: [],
    interior: [],
    official: [],
  },
  specificationsLoadingStatus: FetchStatus.Idle,
};

export const specificationSlice = createSlice({
  name: NameSpace.Specification,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSpecifications.fulfilled, (state, action) => {
        state.specifications = action.payload;
        state.specificationsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSpecifications.pending, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSpecifications.rejected, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchSpecificationsInfo.fulfilled, (state, action) => {
        state.specifications = action.payload;
        state.specificationsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSpecificationsInfo.pending, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSpecificationsInfo.rejected, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchSpecificationsImage.fulfilled, (state, action) => {
        state.specificationImg = action.payload;
        state.specificationsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSpecificationsImage.pending, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSpecificationsImage.rejected, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Failed;
      });
  },
});
