import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { APIRoute } from "../../../../shared/api/routes";
import { AppDispatch, State } from "../../../../app/provider/store";
import { FilterId } from "../../../../features/filter";

import { UsedAdsDataType } from "../../lib/types";
import { getFiltersQuery } from "../../lib/get-filters-query";

export const fetchUsedAds = createAsyncThunk<
  UsedAdsDataType,
  {
    manufacturerIds: number[];
    seriesIds: number[];
    specificationIds: number[];
    filters: Partial<Record<FilterId, number[]>>;
    currentPage: number;
    sort: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Manufacturer/fetchUsedAds", async (reqData, { extra: axios }) => {
  try {
    const { data } = await axios.post<UsedAdsDataType>(
      [
        APIRoute.UsedAds,
        "?",
        `page=${reqData.currentPage}`,
        "&",
        `orderBy=${reqData.sort}`,
        "&",
        getFiltersQuery(reqData.filters),
      ].join(""),
      {
        manufacturerIds: reqData.manufacturerIds,
        seriesIds: reqData.seriesIds,
        specificationIds: reqData.specificationIds,
      }
    );

    return data;
  } catch (err) {
    throw Error("Unable to fetch Used Ads");
  }
});
