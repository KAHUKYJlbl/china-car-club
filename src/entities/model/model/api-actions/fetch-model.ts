import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { PRICE_TYPE_ID } from "../../../../shared/lib/const";
import { APIRoute } from "../../../../shared/api/routes";

import { ModelApiType } from "../../lib/types";
import { generatePath } from "react-router-dom";

export const fetchModel = createAsyncThunk<
  {
    pers: ModelApiType;
    corp: ModelApiType;
    resale: ModelApiType;
  },
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Model/fetchModel", async (modelId, { extra: axios }) => {
  try {
    const pers = await axios.get<ModelApiType>(
      [generatePath(APIRoute.Model, { id: modelId }), `?priceTypeId=${PRICE_TYPE_ID.Pers}`].join("")
    );

    const corp = await axios.get<ModelApiType>(
      [generatePath(APIRoute.Model, { id: modelId }), `?priceTypeId=${PRICE_TYPE_ID.Corp}`].join("")
    );

    const resale = await axios.get<ModelApiType>(
      [generatePath(APIRoute.Model, { id: modelId }), `?priceTypeId=${PRICE_TYPE_ID.Resale}`].join("")
    );

    return {
      pers: pers.data,
      corp: corp.data,
      resale: resale.data,
    };
  } catch (err) {
    throw Error("Unable to fetch Model");
  }
});
