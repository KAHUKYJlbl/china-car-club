import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NameSpace } from "../../../app/provider/store";

import { LogoType, PaletteType, SiteModeType } from "../lib/types";
import { FetchStatus } from "../../../shared/api/fetch-status";
import { fetchSettings } from "./api-actions/fetch-settings";
import { SiteModes } from "../lib/const";

type InitialState = {
  logo: LogoType;
  phone: string;
  palette: PaletteType;
  isNew: boolean;
  name: string;
  siteModes: SiteModeType[];
  currentSiteMode: number;
  settingsLoadingStatus: FetchStatus;
};

const initialState: InitialState = {
  logo: {
    storageUrl: "",
    width: 0,
  },
  phone: "",
  palette: {
    accent: "",
  },
  isNew: true,
  name: "",
  siteModes: [],
  currentSiteMode: SiteModes.New,
  settingsLoadingStatus: FetchStatus.Idle,
};

export const settingsSlice = createSlice({
  name: NameSpace.Settings,
  initialState,
  reducers: {
    setNew: (state) => {
      state.isNew = true;
    },
    setUsed: (state) => {
      state.isNew = false;
    },
    setCurrentSiteMode: (state, action: PayloadAction<number>) => {
      state.currentSiteMode = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.logo = action.payload.logoSvg;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
        state.palette = action.payload.colorPallet;
        state.siteModes = action.payload.siteModeTypes;
        state.settingsLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchSettings.pending, (state) => {
        state.settingsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchSettings.rejected, (state) => {
        state.settingsLoadingStatus = FetchStatus.Failed;
      });
  },
});

export const { setNew, setUsed, setCurrentSiteMode } = settingsSlice.actions;
