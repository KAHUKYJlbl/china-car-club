import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { SpecificationType } from '../lib/types';
import { fetchSpecifications } from './api-actions/fetch-specifications';

type InitialState = {
  specifications: SpecificationType[];
  specificationsLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  specifications: [],
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
    });
  },
});
