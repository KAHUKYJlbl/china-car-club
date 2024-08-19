import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { ManufacturersWithSpecsCountType } from "../../lib/types";

export const fetchManufacturers = createAsyncThunk<
  ManufacturersWithSpecsCountType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Manufacturer/fetchManufacturers", async (_arg, { extra: axios }) => {
  try {
    const { data } = await axios.get<ManufacturersWithSpecsCountType>(APIRoute.Catalog);

    return data;
  } catch (err) {
    throw Error("Unable to fetch Manufacturers");
  }
});
