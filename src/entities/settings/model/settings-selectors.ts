import { createSelector } from "@reduxjs/toolkit";

import { NameSpace, State } from "../../../app/provider/store";
import { FetchStatus } from "../../../shared/api/fetch-status";

import { LogoType, PaletteType, SiteModeType } from "../lib/types";

export const getLogo = (state: State): LogoType => state[NameSpace.Settings].logo;

export const getDealerName = (state: State): string => state[NameSpace.Settings].name;

export const getCompareSpec = (state: State): string => state[NameSpace.Settings].compareSpec;

export const getPhone = (state: State): string => state[NameSpace.Settings].phone;

export const getPalette = (state: State): PaletteType => state[NameSpace.Settings].palette;

export const getIsNew = (state: State): boolean => state[NameSpace.Settings].currentSiteMode === 1;

export const getSiteModes = (state: State): SiteModeType[] => state[NameSpace.Settings].siteModes;

export const getCurrentSiteMode = (state: State): number => state[NameSpace.Settings].currentSiteMode;

export const getSettingsLoadingStatus = createSelector(
  (state: State) => state[NameSpace.Settings].settingsLoadingStatus,
  (status) => ({
    isIdle: status === FetchStatus.Idle,
    isLoading: status === FetchStatus.Pending,
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
