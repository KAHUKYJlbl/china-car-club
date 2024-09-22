import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { APIRoute } from "../../../../shared/api/routes";
import { AppDispatch, State } from "../../../../app/provider/store";

import { UsedAdsApiType } from "../../lib/types";
import { generatePath } from "react-router-dom";

export const fetchAdById = createAsyncThunk<
  UsedAdsApiType,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Used/fetchAdById", async (id, { extra: axios }) => {
  try {
    const { data } = await axios.get<{ data: UsedAdsApiType }>(generatePath(APIRoute.AdById, { id }));

    return data.data;
  } catch (err) {
    throw Error("Unable to fetch Ad By Id");
  }
});
