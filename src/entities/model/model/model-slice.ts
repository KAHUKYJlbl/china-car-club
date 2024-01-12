import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';
import { ModelType } from '../lib/types';

type InitialState = {
  model: ModelType | null;
  modelLoadingStatus: FetchStatus;
}

const initialState: InitialState = {
  model: null,
  modelLoadingStatus: FetchStatus.Idle,
}

export const modelSlice = createSlice({
  name: NameSpace.Model,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchManufacturers.fulfilled, (state, action) => {
        state.model = action.payload;
        state.modelLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchManufacturers.pending, (state) => {
        state.modelLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchManufacturers.rejected, (state) => {
        state.modelLoadingStatus = FetchStatus.Failed;
      })
  }
});
