export type ColorType = {
  title: string;
  hexList: number[];
}

export type SpecsApiType = {
  id: number;
  name: {
    ch: string,
    ru: string,
  };
  state_id: number;
  year: number;
  parameters: {
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
    seats: string[],
    lengthWidthHeight: string,
    groundClearance: number | null,
    curbWeight: number,
    wheelSize: {
      front: string,
      rear: string,
    },
    colors: {
      external: ColorType[],
      interior: ColorType[],
    },
  };
}

export type SpecsType = {
  id: number;
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
  seats: string[],
  lengthWidthHeight: string,
  groundClearance: number | null,
  wheelSize: {
    front: string,
    rear: string,
  };
  colors: {
    external: ColorType[],
    interior: ColorType[],
  };
}

export type ModelApiType = {
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
  specifications: SpecsApiType[]
}

export type ModelType = {
  manufacturerId: number;
  modelId: number;
  manufacturerName: string;
  modelName: string;
  specifications: SpecsType[];
};
