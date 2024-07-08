export type ColorType = {
  title: string;
  hexList: number[];
}

type NameType = {
  ch: string,
  ru: string,
}

export type ParametrApiType = {
  id: number;
  name: string;
}

export type ParamsType = {
  id: number;
  params: {
    engineType: string,
    bodyType: string,
    driveType: string,
    transmissionType: string,
  }
}

export type CustomsType = {
  final: number,
  fee: number,
  duty: number,
  recyclingFee: number,
  exciseTax: number,
  nds: number,
  parkingTowTruck: number;
  customsBrokerServices: number;
};

export type PriceApiType = {
  inChina: number,
  priceInCityOfReceipt: number,
  withLogistics: number,
  tax: number,
  eptsSbktsUtil: number,
  borderPrice: number,
  commission: number,
  customsClearance: CustomsType,
}

export type SpecsApiType = {
  id: number;
  name: NameType;
  stateId: number;
  year: number;
  parameters: {
    engineType: ParametrApiType,
    bodyType: ParametrApiType,
    driveType: ParametrApiType,
    transmissionType: ParametrApiType,
    power: number,
    torque: number | null,
    batteryCapacity: number | null,
    powerReserve: number | null,
    electricPowerReserve: number | null,
    engineCount: number | null,
    seats: string[],
    lengthWidthHeight: string,
    groundClearance: number | null,
    curbWeight: number,
    acceleration: number | null,
    engineCapacity: number | null,
    totalFuelConsumption: number | null,
    wheelSize: {
      front: string,
      rear: string,
    },
    colors: {
      external: ColorType[],
      interior: ColorType[],
    },
  };
  price: PriceApiType;
}

export type ModelApiType = {
  data: SeriesApiType;
}

export type SeriesApiType = {
  id: number;
  name: {
    ch: string;
    ru: string;
  };
  officially_in_russia: boolean;
  manufacturer: {
    id: number;
    name: {
      ch: string;
      ru: string;
    };
    top: boolean;
    region_id: number | null;
  };
  specifications: SpecsApiType[];
}

export type PriceType = {
  inChina: number,
  priceInCityOfReceipt: number,
  withLogisticsPers: number,
  withLogisticsCorp: number,
  withLogisticsResale: number,
  tax: number,
  eptsSbktsUtil: number,
  borderPrice: number,
  commission: number,
  customsClearancePers: CustomsType,
  customsClearanceCorp: CustomsType,
  customsClearanceResale: CustomsType,
}

export type SpecsType = {
  id: number;
  stateId: number;
  name: string;
  year: number;
  engineType: number,
  bodyType: string,
  driveType: string,
  transmissionType: string,
  power: number,
  torque: number | null,
  batteryCapacity: number | null,
  powerReserve: number | null,
  electricPowerReserve: number | null,
  engineCount: number | null,
  seats: string,
  lengthWidthHeight: string,
  groundClearance: number | null,
  curbWeight: number | null,
  acceleration: number | null,
  engineCapacity: number | null,
  totalFuelConsumption: number | null,
  frontWheel: string;
  rearWheel: string;
  colors: {
    external: ColorType[],
    interior: ColorType[],
  };
  price: PriceType;
}

export type ModelType = {
  manufacturerId: number;
  modelId: number;
  manufacturerName: string;
  modelName: string;
  specifications: SpecsType[];
};
