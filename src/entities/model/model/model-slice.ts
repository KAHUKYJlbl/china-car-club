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
        const pers = action.payload.pers.data;
        const corp = action.payload.corp.data;

        state.shorts = pers.specifications.map((specification) => ({
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
          manufacturerId: pers.manufacturer.id,
          modelId: pers.id,
          manufacturerName: pers.manufacturer.name.ru || pers.manufacturer.name.ch,
          modelName: pers.name.ru || pers.name.ch,
          specifications: pers.specifications.map((specification, id) => ({
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
            seats: specification.parameters.seats.filter((seat) => seat !== '0').join(', '),
            lengthWidthHeight: specification.parameters.lengthWidthHeight,
            groundClearance: specification.parameters.groundClearance,
            wheelSize: `${specification.parameters.wheelSize.front} • ${specification.parameters.wheelSize.rear}`,
            colors: specification.parameters.colors,
            curbWeight: specification.parameters.curbWeight,
            engineCapacity: specification.parameters.engineCapacity
            ? specification.parameters.engineCapacity * 1000
            : null,
            price: {
              inChina: specification.price.inChina,
              withLogisticsPers: specification.price.withLogistics,
              withLogisticsCorp: corp.specifications[id].price.withLogistics,
              tax: specification.price.tax,
              eptsSbktsUtil: specification.price.eptsSbktsUtil,
              borderPrice: specification.price.borderPrice,
              commission: specification.price.commission,
              customsClearancePers: specification.price.customsClearance,
              customsClearanceCorp: corp.specifications[id].price.customsClearance,
            },
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
