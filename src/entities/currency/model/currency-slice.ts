import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { CurrencyType } from '../lib/types';
import { fetchCurrency } from './api-actions/fetch-currency';

type InitialState = {
  currency: CurrencyType | null;
  currencyLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  currency: null,
  currencyLoadingStatus: FetchStatus.Idle,
};

export const currencySlice = createSlice({
  name: NameSpace.Currency,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchCurrency.fulfilled, (state, action) => {
      state.currency = action.payload;
      state.currencyLoadingStatus = FetchStatus.Success;
    })
    .addCase(fetchCurrency.pending, (state) => {
      state.currencyLoadingStatus = FetchStatus.Pending;
    })
    .addCase(fetchCurrency.rejected, (state) => {
      state.currencyLoadingStatus = FetchStatus.Failed;
    })
  }
});
