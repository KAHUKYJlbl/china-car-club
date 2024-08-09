import { createSlice } from "@reduxjs/toolkit";

import { NameSpace } from "../../../app/provider/store";

import { LogoType, PaletteType } from "../lib/types";
import { FetchStatus } from "../../../shared/api/fetch-status";
import { fetchSettings } from "./api-actions/fetch-settings";

type InitialState = {
  logo: LogoType;
  phone: string;
  palette: PaletteType;
  isNew: boolean;
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.logo = action.payload.logoSvg;
        state.phone = action.payload.phone;
        state.palette = action.payload.colorPallet;
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

export const { setNew, setUsed } = settingsSlice.actions;
