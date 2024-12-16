import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NameSpace } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";
import { AddsType, CurrentColorType, TaxesTypes } from "../../../widgets/model-info";

import { OfferType, QuestionsType } from "../lib/types";
import { postOrder } from "./api-actions/post-order";
import { postAnswers } from "./api-actions/post-answers";
import { fetchOffer } from "./api-actions/fetch-offer";
import { postUsedOrder } from "./api-actions/post-used-order";
import { postUsedAnswers } from "./api-actions/post-used-answers";

type InitialState = {
  currentTax: TaxesTypes;
  adds: Record<AddsType, boolean>;
  addItems: number[];
  addItemsPrice: number;
  addOptions: number[];
  addOptionsPrice: number;
  addColorPrice: number;
  currentColor: CurrentColorType;
  order: number | null;
  orderLoadingStatus: FetchStatus;
  questions: QuestionsType;
  questionsLoadingStatus: FetchStatus;
  offer: OfferType | null;
  offerLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  currentTax: TaxesTypes.PERS,
  adds: { epts: false, guarantee: false, options: false },
  addItems: [],
  addItemsPrice: 0,
  addOptions: [],
  addOptionsPrice: 0,
  currentColor: { int: null, ext: null, isInteriorFirst: false },
  addColorPrice: 0,
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
  offer: null,
  offerLoadingStatus: FetchStatus.Idle,
};

export const orderSlice = createSlice({
  name: NameSpace.Currency,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.addOptions = initialState.addOptions;
      state.addOptionsPrice = initialState.addOptionsPrice;
      state.currentColor = initialState.currentColor;
      state.addColorPrice = initialState.addColorPrice;
      state.currentTax = initialState.currentTax;
      state.adds = initialState.adds;
      state.addItems = initialState.addItems;
      state.addItemsPrice = initialState.addItemsPrice;
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
    increaseItemsPrice: (state, action: PayloadAction<number>) => {
      state.addItemsPrice = state.addItemsPrice + action.payload;
    },
    decreaseItemsPrice: (state, action: PayloadAction<number>) => {
      state.addItemsPrice = state.addItemsPrice - action.payload;
    },
    addOption: (state, action: PayloadAction<number[]>) => {
      state.addOptions = [...state.addOptions, ...action.payload];
    },
    removeOption: (state, action: PayloadAction<number>) => {
      state.addOptions = [...state.addOptions].filter((item) => item !== action.payload);
    },
    increaseOptionsPrice: (state, action: PayloadAction<number>) => {
      state.addOptionsPrice = state.addOptionsPrice + action.payload;
    },
    decreaseOptionsPrice: (state, action: PayloadAction<number>) => {
      state.addOptionsPrice = state.addOptionsPrice - action.payload;
    },
    setCurrentColor: (state, action: PayloadAction<CurrentColorType>) => {
      state.currentColor = action.payload;
    },
    setAddColorPrice: (state, action: PayloadAction<number>) => {
      state.addColorPrice = action.payload;
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
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.offerLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.offerLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.offerLoadingStatus = FetchStatus.Failed;
      });
  },
});

export const {
  setCurrentTax,
  setAdd,
  toggleAdd,
  addItem,
  removeItem,
  increaseItemsPrice,
  decreaseItemsPrice,
  addOption,
  removeOption,
  increaseOptionsPrice,
  decreaseOptionsPrice,
  setCurrentColor,
  setAddColorPrice,
  resetOrder,
  setQuestions,
} = orderSlice.actions;
