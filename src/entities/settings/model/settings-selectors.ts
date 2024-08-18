import { createSelector } from "@reduxjs/toolkit";

import { NameSpace, State } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";

import { LogoType, PaletteType } from "../lib/types";

export const getLogo = (state: State): LogoType => state[NameSpace.Settings].logo;

export const getDealerName = (state: State): string => state[NameSpace.Settings].name;

export const getPhone = (state: State): string => state[NameSpace.Settings].phone;

export const getPalette = (state: State): PaletteType => state[NameSpace.Settings].palette;

export const getIsNew = (state: State): boolean => state[NameSpace.Settings].isNew;

export const getSettingsLoadingStatus = createSelector(
  (state: State) => state[NameSpace.Settings].settingsLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
