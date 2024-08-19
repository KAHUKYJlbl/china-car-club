import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { PriceHistoryApiType, PriceHistoryType } from "../../lib/types";
import { generatePath } from "react-router-dom";

export const fetchSpecificationPriceHistory = createAsyncThunk<
  PriceHistoryType[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Specifications/fetchSpecificationPriceHistory", async (specificationId, { extra: axios }) => {
  try {
    const { data } = await axios.get<PriceHistoryApiType>(
      generatePath(APIRoute.SpecPriceHistory, { id: specificationId.toString() })
    );

    return data.data;
  } catch (err) {
    throw Error("Unable to fetch Price History");
  }
});
