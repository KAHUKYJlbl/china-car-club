import { createSelector } from '@reduxjs/toolkit';

import { NameSpace, State } from '../../../app/provider/store';
import { AddsType, CurrentColorType, TaxesTypes } from '../../../widgets/model-info';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { MycarsType, QuestionsType } from '../lib/types';

export const getMycars = (state: State): MycarsType => state[NameSpace.Order].mycars;

export const getCurrentTax = (state: State): TaxesTypes => state[NameSpace.Order].currentTax;

export const getAdds = (state: State): Record<AddsType, boolean> => state[NameSpace.Order].adds;

export const getAddItems = (state: State): number[] => state[NameSpace.Order].addItems;

export const getAddItemsPrice = (state: State): number => state[NameSpace.Order].addItemsPrice;

export const getCurrentColor = (state: State): CurrentColorType => state[NameSpace.Order].currentColor;

export const getCurrentOrder = (state: State): number | null => state[NameSpace.Order].order;

export const getQuestions = (state: State): QuestionsType => state[NameSpace.Order].questions;

export const getOrderLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Order].orderLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Pending, FetchStatus.Idle].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getMycarsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Order].mycarsLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
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
