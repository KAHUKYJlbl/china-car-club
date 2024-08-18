import { createSelector } from "@reduxjs/toolkit";

import { NameSpace, State } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";
import {
  LocationType,
  MycarsOrderType,
  MycarsCalculationType,
  MycarsFavoriteType,
  UserType,
  FavoriteByIdType,
} from "../lib/types";

export const getUser = (state: State): UserType | null => state[NameSpace.User].user;

export const getCurrentCity = (state: State): number => state[NameSpace.User].city.id;

export const getGeolocationMode = (state: State): boolean => state[NameSpace.User].city.manualMode;

export const getGeolocation = (state: State): LocationType => state[NameSpace.User].geolocation;

export const getAuthStatus = (state: State): boolean => state[NameSpace.User].isAuth;

export const getOrders = (state: State): MycarsOrderType[] => state[NameSpace.User].mycarsOrders;

export const getCalculations = (state: State): MycarsCalculationType[] => state[NameSpace.User].mycarsCalculations;

export const getFavorites = (state: State): MycarsFavoriteType[] => state[NameSpace.User].mycarsFavorites;

export const getFavoritesCount = (state: State): number => state[NameSpace.User].mycarsFavoritesCount;

export const getPagination = (state: State) => state[NameSpace.User].mycarsPagination;

export const getFavoritesById = (state: State): FavoriteByIdType[] => state[NameSpace.User].mycarsFavoritesById;

export const getUserLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.User].userLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Pending, FetchStatus.Idle].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getOrdersLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.User].mycarsOrdersLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getCalculationsLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.User].mycarsCalculationsLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getFavoritesLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.User].mycarsFavoritesLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getFavoritesCountLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.User].mycarsFavoritesLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);

export const getFavoritesByIdLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.User].mycarsFavoritesByIdLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
