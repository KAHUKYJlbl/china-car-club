import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { CurrencyType } from '../lib/types';
import { fetchCurrency } from './api-actions/fetch-currency';
import { Currencies } from '../lib/const';

type InitialState = {
  currency: CurrencyType | null;
  currentCurrency: Currencies;
  currencyLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  currency: null,
  currentCurrency: Currencies.RUB,
  currencyLoadingStatus: FetchStatus.Idle,
};

export const currencySlice = createSlice({
  name: NameSpace.Currency,
  initialState,
  reducers: {
    setCurrentCurrency: (state, action: PayloadAction<Currencies>) => {
      state.currentCurrency = action.payload;
    },
  },
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

export const { setCurrentCurrency } = currencySlice.actions;
