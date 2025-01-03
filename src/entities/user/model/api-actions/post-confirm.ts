import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { AppDispatch, State } from "../../../../app/provider/store";
import { APIRoute } from "../../../../shared/api/routes";

import { ConfirmType, TokenType } from "../../lib/types";
import { setToken } from "../../../../shared/api/token";

export const postConfirm = createAsyncThunk<
  void,
  ConfirmType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>("User/postConfirm", async (pin, { extra: axios }) => {
  try {
    const { data } = await axios.post<TokenType>(APIRoute.AuthConfirm, pin);
    setToken(data.accessToken);
  } catch (_err) {
    throw Error("Unable to post Auth Confirm");
  }
});
