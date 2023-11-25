import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../lib/name-space';

export const rootReducer = combineReducers({
  [NameSpace.Placeholder]: placeholderSlice.reducer,
});
