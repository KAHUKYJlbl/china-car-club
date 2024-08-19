import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { SpecificationAddProductsApiType, SpecificationAddProductsType } from "../../lib/types";
import { generatePath } from "react-router-dom";

export const fetchSpecificationAddProducts = createAsyncThunk<
  SpecificationAddProductsType,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Specifications/fetchSpecificationAddProducts", async (specificationId, { extra: axios }) => {
  try {
    const { data } = await axios.get<SpecificationAddProductsApiType>(
      generatePath(APIRoute.SpecAddProducts, { id: specificationId.toString() })
    );

    return {
      specId: specificationId,
      ...data,
    };
  } catch (err) {
    throw Error("Unable to fetch Additional Products");
  }
});
