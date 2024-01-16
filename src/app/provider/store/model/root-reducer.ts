import { combineReducers } from '@reduxjs/toolkit';

import { modelSlice } from '../../../../entities/model';
import { currencySlice } from '../../../../entities/currency';
import { manufacturerSlice } from '../../../../entities/manufacturer';
import { specificationSlice } from '../../../../entities/specification';

import { NameSpace } from '../lib/name-space';

export const rootReducer = combineReducers({
  [NameSpace.Manufacturer]: manufacturerSlice.reducer,
  [NameSpace.Specification]: specificationSlice.reducer,
  [NameSpace.Currency]: currencySlice.reducer,
  [NameSpace.Model]: modelSlice.reducer,
});
