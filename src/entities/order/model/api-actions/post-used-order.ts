import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { OrderResponseType, OrderType } from "../../lib/types";

export const postUsedOrder = createAsyncThunk<
  number,
  OrderType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Statistics/postUsedOrder", async (order, { extra: axios }) => {
  try {
    const { data } = await axios.post<OrderResponseType>(APIRoute.PostUsedOrder, order);

    return data.id;
  } catch (err) {
    throw Error("Unable to post used order");
  }
});
