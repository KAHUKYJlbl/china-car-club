import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';
import { AddsType, CurrentColorType, TaxesTypes } from '../../../widgets/model-info';

import { OfferType, QuestionsType, StatisticCalculationType, StatisticOrderType } from '../lib/types';
import { postOrder } from './api-actions/post-order';
import { postAnswers } from './api-actions/post-answers';
import { fetchOrders } from './api-actions/fetch-orders';
import { fetchOffers } from './api-actions/fetch-offers';
import { fetchCalculations } from './api-actions/fetch-calculations';

type InitialState = {
  currentTax: TaxesTypes;
  adds: Record<AddsType, boolean>;
  addItems: number[];
  addItemsPrice: number;
  currentColor: CurrentColorType;
  order: number | null;
  orderLoadingStatus: FetchStatus;
  questions: QuestionsType;
  questionsLoadingStatus: FetchStatus;
  mycarsOrders: StatisticOrderType[];
  mycarsOrdersLoadingStatus: FetchStatus;
  mycarsCalculations: StatisticCalculationType[];
  mycarsCalculationsLoadingStatus: FetchStatus;
  offers: OfferType[];
  offersLoadingStatus: FetchStatus;
  mycarsPagination: {
    currentPage: number,
    total: number,
  };
};

const initialState: InitialState = {
  currentTax: TaxesTypes.PERS,
  adds: {epts: false, guarantee: false, options: false},
  addItems: [],
  addItemsPrice: 0,
  currentColor: {int: null, ext: null, isInteriorFirst: false},
  order: null,
  orderLoadingStatus: FetchStatus.Idle,
  questionsLoadingStatus: FetchStatus.Idle,
  questions: {
    carSupplier: undefined,
    paymentType: {
      1: false,
      3: false,
      4: false,
      5: false,
      6: false,
    },
  },
  mycarsOrders: [],
  mycarsOrdersLoadingStatus: FetchStatus.Idle,
  mycarsCalculations: [],
  mycarsCalculationsLoadingStatus: FetchStatus.Idle,
  offers: [],
  offersLoadingStatus: FetchStatus.Idle,
  mycarsPagination: {
    currentPage: 1,
    total: 1,
  },
};

export const orderSlice = createSlice({
  name: NameSpace.Currency,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentTax = initialState.currentTax;
      state.adds = initialState.adds;
      state.addItems = initialState.addItems;
      state.addItemsPrice = initialState.addItemsPrice;
      state.currentColor = initialState.currentColor;
      state.order = initialState.order;
      state.orderLoadingStatus = initialState.orderLoadingStatus;
      state.questions = {
        carSupplier: undefined,
        paymentType: {
          1: false,
          3: false,
          4: false,
          5: false,
          6: false,
        },
      };
    },
    setQuestions: (state, action: PayloadAction<QuestionsType>) => {
      state.questions = action.payload;
    },
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
      .addCase(postAnswers.fulfilled, (state) => {
        state.questionsLoadingStatus = FetchStatus.Success;
      })
      .addCase(postAnswers.pending, (state) => {
        state.questionsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(postAnswers.rejected, (state) => {
        state.questionsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.mycarsOrders = action.payload.data;
        state.mycarsPagination = action.payload.meta;
        state.mycarsOrdersLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.mycarsOrdersLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.mycarsOrdersLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchCalculations.fulfilled, (state, action) => {
        state.mycarsCalculations = action.payload.data;
        state.mycarsPagination = action.payload.meta;
        state.mycarsCalculationsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchCalculations.pending, (state) => {
        state.mycarsCalculationsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchCalculations.rejected, (state) => {
        state.mycarsCalculationsLoadingStatus = FetchStatus.Failed;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchOffers.pending, (state) => {
        state.offersLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.offersLoadingStatus = FetchStatus.Failed;
      })
  },
});

export const { setCurrentTax, setAdd, toggleAdd, addItem, removeItem, increasePrice, decreasePrice, setCurrentColor, resetOrder, setQuestions } = orderSlice.actions;
