import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';
import { Currencies } from '../lib/const';

export const getCurrentCurrency = (state: State): Currencies => state[NameSpace.Currency].currentCurrency;

export const getCurrency = createSelector(
  (state: State) => state[NameSpace.Currency].currency,
  (currency) => {
    if (currency) {
      return {
        cny: +currency.cny.toFixed(2),
        usd: +currency.usd.toFixed(2),
      }
    }

    return null;
  }
);

export const getCurrencyLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Currency].currencyLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
