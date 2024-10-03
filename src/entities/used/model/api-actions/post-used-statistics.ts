import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";
import { StatisticsType } from "../../../user";

export const postUsedStatistics = createAsyncThunk<
  void,
  StatisticsType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Used/postUsedStatistics", async (statistics, { extra: axios }) => {
  try {
    await axios.post(APIRoute.PostUsedStatistics, statistics);
  } catch (err) {
    throw Error("Unable to post used statistics");
  }
});
