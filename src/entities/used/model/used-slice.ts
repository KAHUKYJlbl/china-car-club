import { createSlice } from "@reduxjs/toolkit";

import { NameSpace } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";

import {
  PaginationType,
  UsedAdsType,
  UsedCountType,
  UsedManufacturerDataType,
  UsedSeriesDataType,
  UsedSpecificationDataType,
} from "../lib/types";
import { fetchUsedManufacturers } from "./api-actions/fetch-used-manufacturers";
import { fetchUsedSpecifications } from "./api-actions/fetch-used-specifications";
import { fetchUsedSeries } from "./api-actions/fetch-used-series";
import { fetchUsedAds } from "./api-actions/fetch-used-ads";

type InitialState = {
  manufacturers: UsedManufacturerDataType[];
  manufacturersLoadingStatus: FetchStatus;
  series: UsedSeriesDataType[];
  seriesLoadingStatus: FetchStatus;
  specifications: UsedSpecificationDataType[];
  specificationsLoadingStatus: FetchStatus;
  count: UsedCountType;
  adsList: UsedAdsType[];
  adsPagination: PaginationType;
  adsLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  manufacturers: [],
  manufacturersLoadingStatus: FetchStatus.Idle,
  series: [],
  seriesLoadingStatus: FetchStatus.Idle,
  specifications: [],
  specificationsLoadingStatus: FetchStatus.Idle,
  count: {
    manufacturersCount: 0,
    seriesCount: 0,
    specificationsCount: 0,
    adsCount: 0,
  },
  adsList: [],
  adsPagination: {
    currentPage: 0,
    lastPage: 0,
  },
  adsLoadingStatus: FetchStatus.Idle,
};

export const usedSlice = createSlice({
  name: NameSpace.Used,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsedManufacturers.fulfilled, (state, action) => {
        state.manufacturers = action.payload.manufacturers;
        state.count = {
          manufacturersCount: action.payload.manufacturersCount,
          seriesCount: action.payload.seriesCount,
          specificationsCount: action.payload.specificationsCount,
          adsCount: action.payload.adsCount,
        };
        state.manufacturersLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchUsedManufacturers.pending, (state) => {
        state.manufacturersLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchUsedManufacturers.rejected, (state) => {
        state.manufacturersLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchUsedSeries.fulfilled, (state, action) => {
        state.series = action.payload;
        state.seriesLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchUsedSeries.pending, (state) => {
        state.seriesLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchUsedSeries.rejected, (state) => {
        state.seriesLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchUsedSpecifications.fulfilled, (state, action) => {
        state.specifications = action.payload;
        state.specificationsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchUsedSpecifications.pending, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchUsedSpecifications.rejected, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchUsedAds.fulfilled, (state, action) => {
        state.adsList = action.payload.data;
        state.adsPagination = action.payload.meta;
        state.adsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchUsedAds.pending, (state) => {
        state.adsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchUsedAds.rejected, (state) => {
        state.adsLoadingStatus = FetchStatus.Failed;
      });
  },
});
