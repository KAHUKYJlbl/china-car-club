import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

export const getManufacturers = (state: State) => state[NameSpace.Manufacturer].manufacturers;

export const getFullList = (state: State) => state[NameSpace.Manufacturer].fullListManufacturers;

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
      isHighlight: manufacturer.top,
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

export const getName = createSelector(
  [
    getFullList,
    (_state: State, id: number | null) => id
  ],
  (manufacturers, id) => {
    if (id) {
      const manufacturer = manufacturers?.manufacturers?.find((manufacturer) =>
        manufacturer.seriesList.some((series) =>
          series.id === id
        )
      );

      if (manufacturer) {
        const manufacturerName = manufacturer.name.ru || manufacturer.name.ch;

        const model = manufacturer.seriesList.find((series) => series.id === id);

        if (model) {
          const modelName = model.name.ru || model.name.ch;

          return `${manufacturerName} ${modelName}`
        }
      }
    }

    return null;
  }
);

export const getManufacturerByModel = createSelector(
  [
    getFullList,
    (_state: State, id: number | null) => id
  ],
  (manufacturers, id) => {
    if (id) {
      return manufacturers?.manufacturers?.find((manufacturer) =>
        manufacturer.seriesList.some((series) =>
          series.id === id
        )
      )?.id
    }

    return null;
  }
);
