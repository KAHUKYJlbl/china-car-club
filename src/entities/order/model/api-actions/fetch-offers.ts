import { createAsyncThunk } from "@reduxjs/toolkit";
import { generatePath } from "react-router-dom";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { OfferType } from "../../lib/types";

export const fetchOffers = createAsyncThunk<
  OfferType[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Statistics/fetchOfers", async (id, { extra: axios }) => {
  try {
    const { data } = await axios.get<OfferType[]>(generatePath(APIRoute.GetOffers, { id: id.toString() }));

    return data;
  } catch (err) {
    throw Error("Unable to get Offers");
  }
});
