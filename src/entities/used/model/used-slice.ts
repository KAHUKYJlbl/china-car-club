import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NameSpace } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";

import {
  PaginationType,
  UsedAdsStoreType,
  UsedAdsType,
  UsedCountType,
  UsedImgType,
  UsedManufacturerDataType,
  UsedSeriesDataType,
  UsedSpecificationDataType,
} from "../lib/types";
import { fetchUsedManufacturers } from "./api-actions/fetch-used-manufacturers";
import { fetchUsedSpecifications } from "./api-actions/fetch-used-specifications";
import { fetchUsedSeries } from "./api-actions/fetch-used-series";
import { fetchUsedAds } from "./api-actions/fetch-used-ads";
import { fetchAdById } from "./api-actions/fetch-ad-by-id";
import { PRICE_TYPE_ID } from "../../../shared/lib/const";

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
  currentAd: UsedAdsStoreType | null;
  currentAdLoadingStatus: FetchStatus;
  currentAdImages: UsedImgType[];
  currentAdImagesLoadingStatus: FetchStatus;
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
    currentPage: 1,
    lastPage: 1,
  },
  adsLoadingStatus: FetchStatus.Idle,
  currentAd: null,
  currentAdLoadingStatus: FetchStatus.Idle,
  currentAdImages: [],
  currentAdImagesLoadingStatus: FetchStatus.Idle,
};

export const usedSlice = createSlice({
  name: NameSpace.Used,
  initialState,
  reducers: {
    dropLists: (state) => {
      state.manufacturers = [];
      state.series = [];
      state.specifications = [];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.adsPagination = { ...state.adsPagination, currentPage: action.payload };
    },
  },
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
      .addCase(fetchAdById.fulfilled, (state, action) => {
        state.currentAd = {
          ...action.payload,
          prices: {
            inChina: action.payload.adPrice,
            priceInCityOfReceipt: action.payload.prices[0].details.priceInCityOfReceipt,
            withLogisticsPers: action.payload.prices.find((prices) => String(prices.typeId) === PRICE_TYPE_ID.Pers)!
              .details.withLogistics,
            withLogisticsCorp: action.payload.prices.find((prices) => String(prices.typeId) === PRICE_TYPE_ID.Corp)!
              .details.withLogistics,
            withLogisticsResale: action.payload.prices.find((prices) => String(prices.typeId) === PRICE_TYPE_ID.Resale)!
              .details.withLogistics,
            tax: action.payload.prices[0].details.tax,
            eptsSbktsUtil: action.payload.prices[0].details.eptsSbktsUtil,
            borderPrice: action.payload.prices[0].details.borderPrice,
            commission: action.payload.prices[0].details.commission,
            customsClearancePers: action.payload.prices.find((prices) => String(prices.typeId) === PRICE_TYPE_ID.Pers)!
              .details.customsClearance,
            customsClearanceCorp: action.payload.prices.find((prices) => String(prices.typeId) === PRICE_TYPE_ID.Corp)!
              .details.customsClearance,
            customsClearanceResale: action.payload.prices.find(
              (prices) => String(prices.typeId) === PRICE_TYPE_ID.Resale
            )!.details.customsClearance,
          },
        };
        state.currentAdLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchAdById.pending, (state) => {
        state.currentAdLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchAdById.rejected, (state) => {
        state.currentAdLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchUsedAds.fulfilled, (state, action) => {
        state.adsList = action.payload.data;
        if (action.payload.meta.lastPage < action.payload.meta.currentPage) {
          state.adsPagination = {
            currentPage: action.payload.meta.lastPage,
            lastPage: action.payload.meta.lastPage,
          };
        } else {
          state.adsPagination = action.payload.meta;
        }
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

export const { dropLists, setCurrentPage } = usedSlice.actions;
