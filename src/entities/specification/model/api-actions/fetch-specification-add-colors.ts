import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { SpecificationAddColorsApiType, SpecificationAddColorsType } from "../../lib/types";
import { generatePath } from "react-router-dom";

export const fetchSpecificationAddColors = createAsyncThunk<
  SpecificationAddColorsType,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Specifications/fetchSpecificationAddColors", async (specificationId, { extra: axios }) => {
  try {
    const { data } = await axios.get<SpecificationAddColorsApiType>(
      generatePath(APIRoute.SpecAddColors, { id: specificationId.toString() })
    );

    return {
      specId: specificationId,
      ...data,
    };
  } catch (err) {
    throw Error("Unable to fetch Additional Colors");
  }
});
