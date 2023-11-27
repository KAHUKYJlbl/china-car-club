import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

const getManufacturers = (state: State) => state[NameSpace.Manufacturer].manufacturers;

export const getCarsCount = createSelector(
  getManufacturers,
  (manufacturers) => ({
    manufacturersCount: manufacturers?.manufacturersCount,
    seriesCount: manufacturers?.seriesCount,
    specificationsCount: manufacturers?.specificationsCount,
  })
);

export const getManufacturersLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Manufacturer].manufacturersLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
