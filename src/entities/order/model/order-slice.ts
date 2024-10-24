import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NameSpace } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";
import { AddsType, CurrentColorType, TaxesTypes } from "../../../widgets/model-info";

import { OfferType, QuestionsType } from "../lib/types";
import { postOrder } from "./api-actions/post-order";
import { postAnswers } from "./api-actions/post-answers";
import { fetchOffers } from "./api-actions/fetch-offers";
import { postUsedOrder } from "./api-actions/post-used-order";
import { postUsedAnswers } from "./api-actions/post-used-answers";

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
  offers: OfferType[];
  offersLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  currentTax: TaxesTypes.PERS,
  adds: { epts: false, guarantee: false, options: false },
  addItems: [],
  addItemsPrice: 0,
  currentColor: { int: null, ext: null, isInteriorFirst: false },
  order: null,
  orderLoadingStatus: FetchStatus.Idle,
  questionsLoadingStatus: FetchStatus.Idle,
  questions: {
    carSupplier: undefined,
    paymentType: {
      1: false,
      4: false,
      5: false,
      6: false,
      7: false,
    },
  },
  offers: [],
  offersLoadingStatus: FetchStatus.Idle,
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
          4: false,
          5: false,
          6: false,
          7: false,
        },
      };
    },
    setQuestions: (state, action: PayloadAction<QuestionsType>) => {
      state.questions = action.payload;
    },
    setCurrentTax: (state, action: PayloadAction<TaxesTypes>) => {
      state.currentTax = action.payload;
    },
    setAdd: (state, action: PayloadAction<{ add: AddsType; value: boolean }>) => {
      state.adds = { ...state.adds, [action.payload.add]: action.payload.value };
    },
    toggleAdd: (state, action: PayloadAction<AddsType>) => {
      console.log(action.payload);
      state.adds = { ...state.adds, [action.payload]: !state.adds[action.payload] };
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
      .addCase(postUsedOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orderLoadingStatus = FetchStatus.Success;
      })
      .addCase(postUsedOrder.pending, (state) => {
        state.orderLoadingStatus = FetchStatus.Pending;
      })
      .addCase(postUsedOrder.rejected, (state) => {
        state.orderLoadingStatus = FetchStatus.Failed;
      })
      .addCase(postUsedAnswers.fulfilled, (state) => {
        state.questionsLoadingStatus = FetchStatus.Success;
      })
      .addCase(postUsedAnswers.pending, (state) => {
        state.questionsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(postUsedAnswers.rejected, (state) => {
        state.questionsLoadingStatus = FetchStatus.Failed;
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
      });
  },
});

export const {
  setCurrentTax,
  setAdd,
  toggleAdd,
  addItem,
  removeItem,
  increasePrice,
  decreasePrice,
  setCurrentColor,
  resetOrder,
  setQuestions,
} = orderSlice.actions;
