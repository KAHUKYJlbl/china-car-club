import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';

import { AddsType, CurrentColorType, TaxesTypes } from '../../../widgets/model-info';

type InitialState = {
  currentTax: TaxesTypes;
  adds: Record<AddsType, boolean>;
  addItems: number[];
  addItemsPrice: number;
  currentColor: CurrentColorType;
};

const initialState: InitialState = {
  currentTax: TaxesTypes.PERS,
  adds: {epts: false, guarantee: false, options: false},
  addItems: [],
  addItemsPrice: 0,
  currentColor: {int: null, ext: null, isInteriorFirst: false},
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
});

export const { setCurrentTax, setAdd, toggleAdd, addItem, removeItem, increasePrice, decreasePrice, setCurrentColor } = orderSlice.actions;
