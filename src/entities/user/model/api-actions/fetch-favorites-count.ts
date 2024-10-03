import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { ApiFavoriteCountType } from "../../lib/types";

export const fetchFavoritesCount = createAsyncThunk<
  ApiFavoriteCountType,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("User/fetchFavoritesCount", async (mode, { extra: axios }) => {
  try {
    const { data } = await axios.get<ApiFavoriteCountType>(APIRoute.GetFavorites, {
      params: { only_count: 1, site_mode_type_id: mode },
    });

    return data;
  } catch (err) {
    throw Error("Unable to get Favorites Count");
  }
});
