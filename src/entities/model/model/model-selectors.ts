import { createSelector } from "@reduxjs/toolkit";

import { NameSpace, State } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";

export const getModel = (state: State) => state[NameSpace.Model].model;

export const getModelLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Model].modelLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  }),
);

export const getShorts = createSelector(
  [(state: State) => state[NameSpace.Model].shorts, (_state: State, id: number | null | undefined) => id],
  (shorts, id) => (id ? shorts?.find((short) => short.id === id)?.params : null),
);

export const getSpecificationParams = createSelector(
  [getModel, (_state: State, id: number | null) => id],
  (model, id) => (id ? model?.specifications.find((spec) => spec.id === id) : null),
);
