import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../app/provider/store';

type InitialState = {
  manufacturer: null;
};

const initialState: InitialState = {
  manufacturer: null,
};

export const manufacturerSlice = createSlice({
  name: NameSpace.Manufacturer,
  initialState,
  reducers: {

  }
});
