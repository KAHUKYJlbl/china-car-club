import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";

import { SettingsApiType } from "../../lib/types";
import { APIRoute } from "../../../../shared/api/routes";

export const fetchSettings = createAsyncThunk<
  SettingsApiType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Settings/fetchSettings", async (_arg, { extra: axios }) => {
  try {
    const { data } = await axios.get<SettingsApiType>(APIRoute.GetSettings);

    return data;
  } catch {
    throw Error("Unable to fetch Settings");
  }
});
