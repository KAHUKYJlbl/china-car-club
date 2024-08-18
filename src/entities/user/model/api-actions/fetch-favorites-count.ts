import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { ApiFavoriteCountType } from "../../lib/types";

export const fetchFavoritesCount = createAsyncThunk<
  ApiFavoriteCountType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("User/fetchFavoritesCount", async (_arg, { extra: axios }) => {
  try {
    const { data } = await axios.get<ApiFavoriteCountType>(APIRoute.GetFavorites, { params: { only_count: 1 } });

    return data;
  } catch (err) {
    throw Error("Unable to get Favorites Count");
  }
});
