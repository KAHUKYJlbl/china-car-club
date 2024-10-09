import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { ApiFavoriteType } from "../../lib/types";

export const fetchFavorites = createAsyncThunk<
  ApiFavoriteType,
  {
    page?: number;
    mode: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("User/fetchFavorites", async (reqData, { extra: axios }) => {
  try {
    const { data } = await axios.get<ApiFavoriteType>(APIRoute.GetFavorites, {
      params: { page: reqData.page, site_mode_type_id: reqData.mode },
    });

    return data;
  } catch (err) {
    throw Error("Unable to get Favorites");
  }
});
