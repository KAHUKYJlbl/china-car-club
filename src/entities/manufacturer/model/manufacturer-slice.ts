import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { fetchFiltered } from './api-actions/fetch-filtered';
import { fetchManufacturers } from './api-actions/fetch-manufacturers';
import { ManufacturersWithSpecsCountType } from '../lib/types';
import { fetchManufacturersWithSpectsCount } from './api-actions/fetch-specs';

type InitialState = {
  fullListManufacturers: ManufacturersWithSpecsCountType | null;
  manufacturers: ManufacturersWithSpecsCountType | null;
  manufacturersLoadingStatus: FetchStatus;
  specsLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  fullListManufacturers: null,
  manufacturers: null,
  manufacturersLoadingStatus: FetchStatus.Idle,
  specsLoadingStatus: FetchStatus.Idle,
};

export const manufacturerSlice = createSlice({
  name: NameSpace.Manufacturer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchManufacturers.fulfilled, (state, action) => {
      state.manufacturers = action.payload;
      state.fullListManufacturers = action.payload;
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
    })
    .addCase(fetchManufacturersWithSpectsCount.fulfilled, (state, action) => {
      state.manufacturers = {
        ...state.manufacturers,
        specificationsCountBySeries: action.payload.specificationsCountBySeries,
      }
      state.specsLoadingStatus = FetchStatus.Success;
    })
    .addCase(fetchManufacturersWithSpectsCount.pending, (state) => {
      state.specsLoadingStatus = FetchStatus.Pending;
    })
    .addCase(fetchManufacturersWithSpectsCount.rejected, (state) => {
      state.specsLoadingStatus = FetchStatus.Failed;
    });
  },
});
