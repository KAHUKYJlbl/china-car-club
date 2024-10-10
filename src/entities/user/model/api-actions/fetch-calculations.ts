import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { ApiCalculationType } from "../../lib/types";

export const fetchCalculations = createAsyncThunk<
  ApiCalculationType,
  {
    page?: number;
    mode: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("User/fetchCalculations", async (reqData, { extra: axios }) => {
  try {
    const { data } = await axios.get<ApiCalculationType>(APIRoute.GetCalculations, {
      params: { page: reqData.page, site_mode_type_id: reqData.mode },
    });

    return data;
  } catch (err) {
    throw Error("Unable to get Calculations");
  }
});
