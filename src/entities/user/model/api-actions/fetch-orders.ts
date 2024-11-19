import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { ApiOrderType } from "../../lib/types";

export const fetchOrders = createAsyncThunk<
  ApiOrderType,
  {
    page?: number;
    mode: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("User/fetchOrders", async (reqData, { extra: axios }) => {
  try {
    const { data } = await axios.get<ApiOrderType>(APIRoute.GetOrders, {
      params: { page: reqData.page, site_mode_type_id: reqData.mode },
    });

    return data;
  } catch (_err) {
    throw Error("Unable to get Orders");
  }
});
