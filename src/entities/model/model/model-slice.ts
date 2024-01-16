import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { ModelType } from '../lib/types';
import { fetchModel } from './api-actions/fetch-model';

type InitialState = {
  model: ModelType | null;
  modelLoadingStatus: FetchStatus;
}

const initialState: InitialState = {
  model: null,
  modelLoadingStatus: FetchStatus.Idle,
}

export const modelSlice = createSlice({
  name: NameSpace.Model,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchModel.fulfilled, (state, action) => {
        state.model = {
          manufacturerId: action.payload.manufacturer.id,
          modelId: action.payload.id,
          manufacturerName: action.payload.manufacturer.name.ru || action.payload.manufacturer.name.ch,
          modelName: action.payload.name.ru || action.payload.name.ch,
          specifications: action.payload.specifications.map((specification) => ({
            id: specification.id,
            name: specification.name.ru || specification.name.ch,
            year: specification.year,
            engineType: specification.parameters.engineType,
            bodyType: specification.parameters.bodyType,
            driveType: specification.parameters.driveType,
            transmissionType: specification.parameters.transmissionType,
            power: specification.parameters.power,
            torque: specification.parameters.torque,
            batteryCapacity: specification.parameters.batteryCapacity,
            powerReserve: specification.parameters.powerReserve,
            electricPowerReserve: specification.parameters.electricPowerReserve,
            engineCount: specification.parameters.engineCount,
            seats: specification.parameters.seats,
            lengthWidthHeight: specification.parameters.lengthWidthHeight,
            groundClearance: specification.parameters.groundClearance,
            wheelSize: specification.parameters.wheelSize,
            colors: specification.parameters.colors,
          }))
        };
        state.modelLoadingStatus = FetchStatus.Success;
      })
      .addCase(fetchModel.pending, (state) => {
        state.modelLoadingStatus = FetchStatus.Pending;
      })
      .addCase(fetchModel.rejected, (state) => {
        state.modelLoadingStatus = FetchStatus.Failed;
      })
  }
});
