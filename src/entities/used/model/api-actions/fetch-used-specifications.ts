import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { APIRoute } from "../../../../shared/api/routes";
import { AppDispatch, State } from "../../../../app/provider/store";
import { FilterId } from "../../../../features/filter";

import { UsedSpecificationDataType } from "../../lib/types";
import { getFiltersQuery } from "../../lib/get-filters-query";

export const fetchUsedSpecifications = createAsyncThunk<
  UsedSpecificationDataType[],
  { seriesIds: number[]; filters: Partial<Record<FilterId, number[]>> },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Manufacturer/fetchUsedSpecifications", async (reqData, { extra: axios }) => {
  try {
    const { data } = await axios.post<UsedSpecificationDataType[]>(
      [APIRoute.UsedSpecifications, "?", getFiltersQuery(reqData.filters)].join(""),
      { seriesIds: reqData.seriesIds }
    );

    return data;
  } catch (err) {
    throw Error("Unable to fetch Used Specifications");
  }
});
