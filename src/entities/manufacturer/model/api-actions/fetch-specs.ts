import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import queryString from "query-string";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";
import { FilterId } from "../../../../features/filter/lib/types";

import { ManufacturersWithSpecsCountType } from "../../lib/types";
import { getFiltersQuery } from "../../lib/get-filters-query";

export const fetchManufacturersWithSpectsCount = createAsyncThunk<
  ManufacturersWithSpecsCountType,
  {
    manufacturerId: number;
    filters: Partial<Record<FilterId, number[]>>;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Manufacturer/fetchManufacturersWithSpecsCount", async ({ manufacturerId, filters }, { extra: axios }) => {
  try {
    const { data } = await axios.get<ManufacturersWithSpecsCountType>(
      [
        APIRoute.Catalog,
        queryString.stringifyUrl({
          url: "",
          query: { manufacturerId: manufacturerId },
        }),
        "&",
        getFiltersQuery(filters),
      ].join("")
    );

    return data;
  } catch (err) {
    throw Error("Unable to fetch Manufacturers with Specs");
  }
});
