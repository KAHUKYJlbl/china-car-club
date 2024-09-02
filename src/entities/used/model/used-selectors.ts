import { createSelector } from "@reduxjs/toolkit";

import { NameSpace, State } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";

export const getUsedManufacturers = (state: State) => state[NameSpace.Used].manufacturers;

export const getUsedManuacturersList = createSelector(getUsedManufacturers, (manufacturers) =>
  manufacturers.map((manufacturer) => ({
    name: manufacturer.name.ru || manufacturer.name.ch,
    id: manufacturer.id,
    sublistLength: manufacturer.seriesCount,
    isHighlight: false,
  }))
);

export const getUsedSeries = (state: State) => state[NameSpace.Used].series;

export const getUsedSeriesList = createSelector(getUsedSeries, (series) =>
  series.map((series) => ({
    name: series.name.ru || series.name.ch,
    id: series.id,
    sublistLength: series.specificationsCount,
  }))
);

export const getUsedSpecifications = (state: State) => state[NameSpace.Used].specifications;

export const getUsedSpecificationsList = createSelector(getUsedSpecifications, (series) =>
  series.map((series) => ({
    name: series.name.ru || series.name.ch,
    id: series.id,
    sublistLength: series.adsCount,
  }))
);

export const getUsedCount = (state: State) => state[NameSpace.Used].count;

export const getUsedManufacturersLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Used].manufacturersLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getUsedSeriesLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Used].seriesLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getUsedSpecificationsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Used].specificationsLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
