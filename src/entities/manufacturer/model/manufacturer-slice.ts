import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { fetchFiltered } from './api-actions/fetch-filtered';
import { fetchManufacturers } from './api-actions/fetch-manufacturers';
import { ManufacturersType } from '../lib/types';

type InitialState = {
  manufacturers: ManufacturersType | null;
  manufacturersLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  manufacturers: null,
  manufacturersLoadingStatus: FetchStatus.Idle,
};

export const manufacturerSlice = createSlice({
  name: NameSpace.Manufacturer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchManufacturers.fulfilled, (state, action) => {
      state.manufacturers = action.payload;
      state.manufacturersLoadingStatus = FetchStatus.Success;
    })
    .addCase(fetchManufacturers.pending, (state) => {
      state.manufacturersLoadingStatus = FetchStatus.Pending;
    })
    .addCase(fetchManufacturers.rejected, (state) => {
      state.manufacturersLoadingStatus = FetchStatus.Failed;
    })
    .addCase(fetchFiltered.fulfilled, (state, action) => {
      state.manufacturers = action.payload;
      state.manufacturersLoadingStatus = FetchStatus.Success;
    })
    .addCase(fetchFiltered.pending, (state) => {
      state.manufacturersLoadingStatus = FetchStatus.Pending;
    })
    .addCase(fetchFiltered.rejected, (state) => {
      state.manufacturersLoadingStatus = FetchStatus.Failed;
    });
  },
});
