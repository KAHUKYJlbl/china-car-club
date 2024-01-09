import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

export const getCurrency = (state: State) => state[NameSpace.Currency].currency;

export const getCurrencyLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Currency].currencyLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
