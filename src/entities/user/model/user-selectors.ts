import { createSelector } from "@reduxjs/toolkit";

import { NameSpace, State } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";
import { UserType } from "../lib/types";

export const getUser = (state: State): UserType | null => state[NameSpace.User].user;

export const getUserLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.User].userLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Pending, FetchStatus.Idle].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
