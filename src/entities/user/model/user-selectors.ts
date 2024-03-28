import { createSelector } from "@reduxjs/toolkit";

import { NameSpace, State } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";
import { LocationType, UserType } from "../lib/types";

export const getUser = (state: State): UserType | null => state[NameSpace.User].user;

export const getGeolocation = (state: State): LocationType => state[NameSpace.User].geolocation;

export const getAuthStatus = (state: State): boolean => state[NameSpace.User].isAuth;

export const getUserLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.User].userLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Pending, FetchStatus.Idle].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
