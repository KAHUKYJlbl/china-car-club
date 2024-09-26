import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { APIRoute } from "../../../../shared/api/routes";
import { AppDispatch, State } from "../../../../app/provider/store";

import { UsedImgApiType, UsedImgType } from "../../lib/types";
import { generatePath } from "react-router-dom";

export const fetchAdImages = createAsyncThunk<
  UsedImgType[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Used/fetchAdImages", async (id, { extra: axios }) => {
  try {
    const { data } = await axios.get<UsedImgApiType>(generatePath(APIRoute.AdImages, { id }));

    return data.official[0].urls;
  } catch (err) {
    throw Error("Unable to fetch Ad Images");
  }
});
