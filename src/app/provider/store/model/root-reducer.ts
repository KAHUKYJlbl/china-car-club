import { combineReducers } from "@reduxjs/toolkit";

import { userSlice } from "../../../../entities/user";
import { modelSlice } from "../../../../entities/model";
import { orderSlice } from "../../../../entities/order";
import { gallerySlice } from "../../../../entities/gallery";
import { currencySlice } from "../../../../entities/currency";
import { manufacturerSlice } from "../../../../entities/manufacturer";
import { specificationSlice } from "../../../../entities/specification";
import { settingsSlice } from "../../../../entities/settings/model/settings-slice";

import { NameSpace } from "../lib/name-space";

export const rootReducer = combineReducers({
  [NameSpace.Manufacturer]: manufacturerSlice.reducer,
  [NameSpace.Specification]: specificationSlice.reducer,
  [NameSpace.Currency]: currencySlice.reducer,
  [NameSpace.Model]: modelSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Gallery]: gallerySlice.reducer,
  [NameSpace.Order]: orderSlice.reducer,
  [NameSpace.Settings]: settingsSlice.reducer,
});
