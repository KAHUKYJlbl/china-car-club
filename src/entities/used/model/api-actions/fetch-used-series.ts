import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { APIRoute } from "../../../../shared/api/routes";
import { AppDispatch, State } from "../../../../app/provider/store";
import { FilterId } from "../../../../features/filter";

import { UsedSeriesDataType } from "../../lib/types";
import { getFiltersQuery } from "../../lib/get-filters-query";

export const fetchUsedSeries = createAsyncThunk<
  UsedSeriesDataType[],
  { manufacturerId: number[]; filters: Partial<Record<FilterId, number[]>> },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Used/fetchUsedSeries", async (reqData, { extra: axios }) => {
  try {
    const { data } = await axios.post<UsedSeriesDataType[]>(
      [APIRoute.UsedSeries, "?", getFiltersQuery(reqData.filters)].join(""),
      { manufacturerIds: reqData.manufacturerId }
    );

    return data;
  } catch (err) {
    throw Error("Unable to fetch Used Series");
  }
});
