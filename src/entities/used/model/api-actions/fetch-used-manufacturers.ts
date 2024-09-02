import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { APIRoute } from "../../../../shared/api/routes";
import { AppDispatch, State } from "../../../../app/provider/store";
import { FilterId } from "../../../../features/filter";

import { UsedManufacturersType } from "../../lib/types";
import { getFiltersQuery } from "../../lib/get-filters-query";

export const fetchUsedManufacturers = createAsyncThunk<
  UsedManufacturersType,
  Partial<Record<FilterId, number[]>>,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Manufacturer/fetchUsedManufacturers", async (filters, { extra: axios }) => {
  try {
    const { data } = await axios.post<UsedManufacturersType>(
      [APIRoute.UsedCatalog, "?", getFiltersQuery(filters)].join("")
    );

    return data;
  } catch (err) {
    throw Error("Unable to fetch Used Manufacturers");
  }
});
