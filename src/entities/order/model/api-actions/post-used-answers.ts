import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { decamelizeKeys } from "humps";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { AnswersType } from "../../lib/types";

export const postUsedAnswers = createAsyncThunk<
  void,
  AnswersType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("Statistics/postUsedAnswers", async (answers, { extra: axios }) => {
  try {
    await axios.post(APIRoute.PostUsedAnswers, decamelizeKeys(answers));
  } catch (err) {
    throw Error("Unable to post used answers");
  }
});
