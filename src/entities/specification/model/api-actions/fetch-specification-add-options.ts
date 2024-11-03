import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { SpecificationAddOptionsApiType, SpecificationAddOptionsType } from "../../lib/types";
import { generatePath } from "react-router-dom";

export const fetchSpecificationAddOptions = createAsyncThunk<
  SpecificationAddOptionsType,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Specifications/fetchSpecificationAddOptions", async (specificationId, { extra: axios }) => {
  try {
    const { data } = await axios.get<SpecificationAddOptionsApiType>(
      generatePath(APIRoute.SpecAddOptions, { id: specificationId.toString() })
    );

    return {
      specId: specificationId,
      options: data.groups.items,
    };
  } catch (err) {
    throw Error("Unable to fetch Additional Options");
  }
});
