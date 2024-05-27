import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { AddsType, CurrentColorType, TaxesTypes } from '../../../widgets/model-info';
import { postOrder } from './api-actions/post-order';

type InitialState = {
  currentTax: TaxesTypes;
  adds: Record<AddsType, boolean>;
  addItems: number[];
  addItemsPrice: number;
  currentColor: CurrentColorType;
  order: number | null;
  orderLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  currentTax: TaxesTypes.PERS,
  adds: {epts: false, guarantee: false, options: false},
  addItems: [],
  addItemsPrice: 0,
  currentColor: {int: null, ext: null, isInteriorFirst: false},
  order: null,
  orderLoadingStatus: FetchStatus.Idle,
};

export const orderSlice = createSlice({
  name: NameSpace.Currency,
  initialState,
  reducers: {
    setCurrentTax: (state, action: PayloadAction<TaxesTypes>) => {
      state.currentTax = action.payload;
    },
    setAdd: (state, action: PayloadAction<{add: AddsType, value: boolean}>) => {
      state.adds = {...state.adds, [action.payload.add]: action.payload.value};
    },
    toggleAdd: (state, action: PayloadAction<AddsType>) => {
      console.log(action.payload);
      state.adds = {...state.adds, [action.payload]: !state.adds[action.payload]};
    },
    addItem: (state, action: PayloadAction<number>) => {
      state.addItems = [...state.addItems, action.payload];
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.addItems = [...state.addItems].filter((item) => item !== action.payload);
    },
    increasePrice: (state, action: PayloadAction<number>) => {
      state.addItemsPrice = state.addItemsPrice + action.payload;
    },
    decreasePrice: (state, action: PayloadAction<number>) => {
      state.addItemsPrice = state.addItemsPrice - action.payload;
    },
    setCurrentColor: (state, action: PayloadAction<CurrentColorType>) => {
      state.currentColor = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orderLoadingStatus = FetchStatus.Success;
      })
      .addCase(postOrder.pending, (state) => {
        state.orderLoadingStatus = FetchStatus.Pending;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderLoadingStatus = FetchStatus.Failed;
      })
  },
});

export const { setCurrentTax, setAdd, toggleAdd, addItem, removeItem, increasePrice, decreasePrice, setCurrentColor } = orderSlice.actions;
