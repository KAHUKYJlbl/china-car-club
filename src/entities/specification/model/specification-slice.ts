import { createSlice } from "@reduxjs/toolkit";

import { NameSpace } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";

import {
  PriceHistoryType,
  SpecificationAddColorsType,
  SpecificationAddOptionsType,
  SpecificationAddProductsType,
  SpecificationImageType,
  SpecificationType,
} from "../lib/types";
import { fetchSpecifications } from "./api-actions/fetch-specifications";
import { fetchSpecificationsInfo } from "./api-actions/fetch-specification-info";
import { fetchSpecificationsImage } from "./api-actions/fetch-specification-image";
import { fetchSpecificationAddProducts } from "./api-actions/fetch-specification-add-products";
import { ADDS_GROUPS } from "../lib/const";
import { fetchSpecificationPriceHistory } from "./api-actions/fetch-specification-price-history";
import { fetchSpecificationAddColors } from "./api-actions/fetch-specification-add-colors";
import { fetchSpecificationAddOptions } from "./api-actions/fetch-specification-add-options";

type InitialState = {
  specifications: SpecificationType[];
  specificationImg: SpecificationImageType;
  specificationAddProducts: SpecificationAddProductsType | null;
  specificationAddOptions: SpecificationAddOptionsType | null;
  specificationAddColors: SpecificationAddColorsType | null;
  specificationPriceHistory: PriceHistoryType[];
  specificationsLoadingStatus: FetchStatus;
  specificationImgLoadingStatus: FetchStatus;
  specificationAddProductsLoadingStatus: FetchStatus;
  specificationAddOptionsLoadingStatus: FetchStatus;
  specificationAddColorsLoadingStatus: FetchStatus;
  specificationPriceHistoryLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  specifications: [],
  specificationAddProducts: null,
  specificationAddOptions: null,
  specificationAddColors: null,
  specificationImg: {
    external: [],
    interior: [],
    official: [],
  },
  specificationPriceHistory: [],
  specificationsLoadingStatus: FetchStatus.Idle,
  specificationAddProductsLoadingStatus: FetchStatus.Idle,
  specificationAddOptionsLoadingStatus: FetchStatus.Idle,
  specificationAddColorsLoadingStatus: FetchStatus.Idle,
  specificationImgLoadingStatus: FetchStatus.Idle,
  specificationPriceHistoryLoadingStatus: FetchStatus.Idle,
};

export const specificationSlice = createSlice({
  name: NameSpace.Specification,
  initialState,
  reducers: {
    setSpecsIdle: (state) => {
      state.specifications = [];
      state.specificationAddProducts = null;
      state.specificationPriceHistory = [];
      state.specificationImg = {
        external: [],
        interior: [],
        official: [],
      };
      state.specificationsLoadingStatus = FetchStatus.Idle;
      state.specificationImgLoadingStatus = FetchStatus.Idle;
      state.specificationAddProductsLoadingStatus = FetchStatus.Idle;
      state.specificationPriceHistoryLoadingStatus = FetchStatus.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSpecifications.fulfilled, (state, action) => {
        state.specifications = action.payload;
        state.specificationsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSpecifications.pending, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSpecifications.rejected, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchSpecificationAddProducts.fulfilled, (state, action) => {
        state.specificationAddProducts = {
          specId: action.payload.specId,
          groups: action.payload.groups.map((group) => ({
            ...group,
            description: group.description || ADDS_GROUPS[group.id].description,
            items: group.items.map((item) => ({
              ...item,
              description: item.description || ADDS_GROUPS[group.id].items[item.id],
            })),
          })),
        };
        state.specificationAddProductsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSpecificationAddProducts.pending, (state) => {
        state.specificationAddProductsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSpecificationAddProducts.rejected, (state) => {
        state.specificationAddProductsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchSpecificationAddOptions.fulfilled, (state, action) => {
        state.specificationAddOptions = action.payload;
        state.specificationAddOptionsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSpecificationAddOptions.pending, (state) => {
        state.specificationAddOptionsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSpecificationAddOptions.rejected, (state) => {
        state.specificationAddOptionsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchSpecificationAddColors.fulfilled, (state, action) => {
        state.specificationAddColors = action.payload;
        state.specificationAddColorsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSpecificationAddColors.pending, (state) => {
        state.specificationAddColorsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSpecificationAddColors.rejected, (state) => {
        state.specificationAddColorsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchSpecificationsInfo.fulfilled, (state, action) => {
        state.specifications = action.payload;
        state.specificationsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSpecificationsInfo.pending, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSpecificationsInfo.rejected, (state) => {
        state.specificationsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchSpecificationPriceHistory.fulfilled, (state, action) => {
        state.specificationPriceHistory = action.payload;
        state.specificationPriceHistoryLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSpecificationPriceHistory.pending, (state) => {
        state.specificationPriceHistoryLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSpecificationPriceHistory.rejected, (state) => {
        state.specificationPriceHistoryLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchSpecificationsImage.fulfilled, (state, action) => {
        state.specificationImg = action.payload;
        state.specificationImgLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSpecificationsImage.pending, (state) => {
        state.specificationImgLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSpecificationsImage.rejected, (state) => {
        state.specificationImgLoadingStatus = FetchStatus.Failed;
      });
  },
});

export const { setSpecsIdle } = specificationSlice.actions;
