import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../../app/provider/store';
import { FetchStatus } from '../../../shared/api/fetch-status';

import { ModelType, ParamsType } from '../lib/types';
import { fetchModel } from './api-actions/fetch-model';
import { FILTERS } from '../../../app/settings/filters';

type InitialState = {
  model: ModelType | null;
  shorts: ParamsType[];
  modelLoadingStatus: FetchStatus;
}

const initialState: InitialState = {
  model: null,
  shorts: [],
  modelLoadingStatus: FetchStatus.Idle,
}

export const modelSlice = createSlice({
  name: NameSpace.Model,
  initialState,
  reducers: {
    setIdle: (state) => {
      state.model = null;
      state.modelLoadingStatus = FetchStatus.Idle;
    },
    setPending: (state) => {
      state.modelLoadingStatus = FetchStatus.Pending;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchModel.fulfilled, (state, action) => {
        const data = action.payload.data;

        state.shorts = data.specifications.map((specification) => ({
          id: specification.id,
          params: {
            engineType: FILTERS.engine!.elements.find((element) =>
              element.elementId === specification.parameters.engineType.id
            )?.name || '',
            bodyType: FILTERS.body!.elements.find((element) =>
              element.elementId === specification.parameters.bodyType.id
            )?.name || '',
            driveType: `${FILTERS.drive!.elements.find((element) =>
              element.elementId === specification.parameters.driveType.id
            )?.name} привод` || '',
            transmissionType: `${FILTERS.transmission!.elements.find((element) =>
              element.elementId === specification.parameters.transmissionType.id
            )?.name} коробка передач` || '',
          }
        }))

        state.model = {
          manufacturerId: data.manufacturer.id,
          modelId: data.id,
          manufacturerName: data.manufacturer.name.ru || data.manufacturer.name.ch,
          modelName: data.name.ru || data.name.ch,
          specifications: data.specifications.map((specification) => ({
            id: specification.id,
            name: specification.name.ru || specification.name.ch,
            year: specification.year,
            engineType: specification.parameters.engineType.id,
            bodyType: specification.parameters.bodyType.name,
            driveType: specification.parameters.driveType.name,
            transmissionType: specification.parameters.transmissionType.name,
            power: specification.parameters.power,
            torque: specification.parameters.torque,
            batteryCapacity: specification.parameters.batteryCapacity,
            powerReserve: specification.parameters.powerReserve,
            electricPowerReserve: specification.parameters.electricPowerReserve,
            engineCount: specification.parameters.engineCount,
            seats: specification.parameters.seats.join(', '),
            lengthWidthHeight: specification.parameters.lengthWidthHeight,
            groundClearance: specification.parameters.groundClearance,
            wheelSize: `${specification.parameters.wheelSize.front} • ${specification.parameters.wheelSize.rear}`,
            colors: specification.parameters.colors,
            curbWeight: specification.parameters.curbWeight,
            engineCapacity: specification.parameters.engineCapacity
            ? specification.parameters.engineCapacity * 1000
            : null,
            price: specification.price,
            acceleration: specification.parameters.acceleration,
            totalFuelConsumption: specification.parameters.totalFuelConsumption,
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

export const { setIdle, setPending } = modelSlice.actions;
