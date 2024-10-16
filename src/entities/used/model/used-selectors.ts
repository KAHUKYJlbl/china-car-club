import { createSelector } from "@reduxjs/toolkit";

import { NameSpace, State } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";
import { FILTERS } from "../../../app/settings/filters";

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
    year: series.year,
  }))
);

export const getUsedCount = (state: State) => state[NameSpace.Used].count;

export const getUsedAdsList = (state: State) => state[NameSpace.Used].adsList;

export const getUsedAdsPagination = (state: State) => state[NameSpace.Used].adsPagination;

export const getCurrentAd = (state: State) => state[NameSpace.Used].currentAd;

export const getAdImages = (state: State) => state[NameSpace.Used].currentAdImages;

export const getUsedShorts = createSelector(getCurrentAd, (currentAd) => {
  return {
    engineType:
      FILTERS.engine!.elements.find(
        (element) => element.elementId === currentAd?.specification.parameters.engineType.id
      )?.name || "",
    bodyType:
      FILTERS.body!.elements.find((element) => element.elementId === currentAd?.specification.parameters.bodyType.id)
        ?.name || "",
    driveType:
      `${
        FILTERS.drive!.elements.find(
          (element) => element.elementId === currentAd?.specification.parameters.driveType.id
        )?.name
      } привод` || "",
    transmissionType:
      `${
        FILTERS.transmission!.elements.find(
          (element) => element.elementId === currentAd?.specification.parameters.transmissionType.id
        )?.name
      } коробка передач` || "",
  };
});

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

export const getUsedAdsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Used].adsLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getCurrentAdLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Used].currentAdLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getAdImagesLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Used].currentAdImagesLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
