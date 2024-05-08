import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { SpecificationAddProductsType, SpecificationImageType, SpecificationType } from '../lib/types';
import { fetchSpecifications } from './api-actions/fetch-specifications';
import { fetchSpecificationsInfo } from './api-actions/fetch-specification-info';
import { fetchSpecificationsImage } from './api-actions/fetch-specification-image';
import { fetchSpecificationAddProducts } from './api-actions/fetch-specification-add-products';
import { ADDS_GROUPS } from '../lib/const';

type InitialState = {
  specificationAddProducts: SpecificationAddProductsType | null;
  specifications: SpecificationType[];
  specificationImg: SpecificationImageType;
  specificationsLoadingStatus: FetchStatus;
  specificationAddProductsLoadingStatus: FetchStatus;
  specificationImgLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  specifications: [],
  specificationAddProducts: null,
  specificationImg: {
    external: [],
    interior: [],
    official: [],
  },
  specificationsLoadingStatus: FetchStatus.Idle,
  specificationAddProductsLoadingStatus: FetchStatus.Idle,
  specificationImgLoadingStatus: FetchStatus.Idle,
};

export const specificationSlice = createSlice({
  name: NameSpace.Specification,
  initialState,
  reducers: {
    setSpecsIdle: (state) => {
      state.specifications = [];
      state.specificationImg = {
        external: [],
        interior: [],
        official: [],
      };
      state.specificationsLoadingStatus = FetchStatus.Idle;
      state.specificationImgLoadingStatus = FetchStatus.Idle;
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
              description: item.description || ADDS_GROUPS[group.id].items[item.id]
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

