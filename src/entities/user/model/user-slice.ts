import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { fetchHash } from './api-actons/fetch-hash';
import { fetchSms } from './api-actons/fetch-sms';
import { UserType } from '../lib/types';
import { fetchConfirm } from './api-actons/fetch-confirm';


type InitialState = {
  user: UserType | null;
  userLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  user: null,
  userLoadingStatus: FetchStatus.Idle,
};

export const userSlice = createSlice({
  name: NameSpace.Specification,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHash.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchHash.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchHash.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchSms.fulfilled, (state) => {
        state.userLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSms.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSms.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchConfirm.fulfilled, (state) => {
        state.userLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchConfirm.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchConfirm.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
      })
;
  },
});
