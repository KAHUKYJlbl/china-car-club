import { combineReducers } from '@reduxjs/toolkit';

import { manufacturerSlice } from '../../../../entities/manufacturer';
import { specificationSlice } from '../../../../entities/specification';

import { NameSpace } from '../lib/name-space';
import { currencySlice } from '../../../../entities/currency';

export const rootReducer = combineReducers({
  [NameSpace.Manufacturer]: manufacturerSlice.reducer,
  [NameSpace.Specification]: specificationSlice.reducer,
  [NameSpace.Currency]: currencySlice.reducer,
});
