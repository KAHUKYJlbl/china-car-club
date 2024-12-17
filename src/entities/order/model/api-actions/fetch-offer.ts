import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { OfferType } from "../../lib/types";
import { generatePath } from "react-router-dom";

export const fetchOffer = createAsyncThunk<
  OfferType,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Statistics/fetchOfer", async (id, { extra: axios }) => {
  try {
    const { data } = await axios.get<{ data: OfferType }>(generatePath(APIRoute.GetOffer, { id }));

    return data.data;
  } catch (_err) {
    throw Error("Unable to get Offer");
  }
});
