import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

export const getManufacturers = (state: State) => state[NameSpace.Manufacturer].manufacturers;

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

export const getSpecsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Manufacturer].specsLoadingStatus,
  (status) => ({
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getManuacturersList = createSelector(
  getManufacturers,
  (manufacturers) => (
    manufacturers?.manufacturers?.map((manufacturer) => ({
      name: manufacturer.name.ru || manufacturer.name.ch,
      id: manufacturer.id,
      sublistLength: manufacturer.seriesList.length,
    }))
  )
);

export const getModelsList = createSelector(
  [
    getManufacturers,
    (_state: State, id: number | null) => id
  ],
  (manufacturers, id) => (
    id
    ? manufacturers?.manufacturers?.find((manufacturer) => (
        manufacturer.id === id
      ))?.seriesList.map((model) => ({
        name: model.name.ru || model.name.ch,
        id: model.id,
        sublistLength: manufacturers.specificationsCountBySeries ? manufacturers.specificationsCountBySeries[model.id] : null,
      }))
    : null
  )
);
