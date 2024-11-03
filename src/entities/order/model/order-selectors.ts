import { createSelector } from "@reduxjs/toolkit";

import { NameSpace, State } from "../../../app/provider/store";
import { AddsType, CurrentColorType, TaxesTypes } from "../../../widgets/model-info";
import { FetchStatus } from "../../../shared/api/fetch-status";

import { OfferType, QuestionsType } from "../lib/types";

export const getCurrentTax = (state: State): TaxesTypes => state[NameSpace.Order].currentTax;

export const getAdds = (state: State): Record<AddsType, boolean> => state[NameSpace.Order].adds;

export const getAddItems = (state: State): number[] => state[NameSpace.Order].addItems;

export const getAddItemsPrice = (state: State): number => state[NameSpace.Order].addItemsPrice;

export const getAddedOptions = (state: State): number[] => state[NameSpace.Order].addOptions;

export const getAddedOptionsPrice = (state: State): number => state[NameSpace.Order].addOptionsPrice;

export const getCurrentColor = (state: State): CurrentColorType => state[NameSpace.Order].currentColor;

export const getCurrentColorPrice = (state: State): number => state[NameSpace.Order].addColorPrice;

export const getCurrentOrder = (state: State): number | null => state[NameSpace.Order].order;

export const getQuestions = (state: State): QuestionsType => state[NameSpace.Order].questions;

export const getOffers = (state: State): OfferType[] => state[NameSpace.Order].offers;

export const getOffersLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Order].offersLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Pending, FetchStatus.Idle].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getOrderLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Order].orderLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Pending, FetchStatus.Idle].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getQuestionsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Order].questionsLoadingStatus,
  (status) => ({
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
