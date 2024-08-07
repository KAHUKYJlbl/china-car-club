export type TechsByTypes = {
  electro: boolean,
  hybrid: boolean,
  ice: boolean,
};

export type ElectroSpecsType = {
  bodyType: string;
  driveType: string,
  transmissionType: string,
  power: number,
  torque?: number,
  batteryCapacity?: number,
  electricPowerReserve?: number,
  engineCount?: number,
  seats: string,
  lengthWidthHeight: string,
  groundClearance?: number,
  curbWeight?: number,
  acceleration?: number,
  totalFuelConsumption?: number,
  frontWheel: string;
  rearWheel: string;
};

export type HybridSpecsType = {
  bodyType: string;
  driveType: string,
  transmissionType: string,
  power: number,
  torque?: number,
  batteryCapacity?: number,
  powerReserve?: number,
  electricPowerReserve?: number,
  engineCount?: number,
  seats: string,
  lengthWidthHeight: string,
  groundClearance?: number,
  curbWeight?: number,
  acceleration?: number,
  totalFuelConsumption?: number,
  engineCapacity?: number,
  frontWheel: string;
  rearWheel: string;
};

export type IceSpecsType = {
  bodyType: string;
  driveType: string,
  transmissionType: string,
  power: number,
  torque?: number,
  powerReserve?: number,
  seats: string,
  lengthWidthHeight: string,
  groundClearance?: number,
  curbWeight?: number,
  acceleration?: number,
  totalFuelConsumption?: number,
  engineCapacity?: number,
  frontWheel: string;
  rearWheel: string;
};

export type Entrytype = [string, string | number];

export type TechNameType = {
  name: string,
  measure: string,
};

export type TechType = TechNameType & {
  value: string | number,
};

export type AddsType = 'epts' | 'guarantee' | 'options';

export type CurrentColorType = {
  int: number | null,
  ext: number | null,
  isInteriorFirst: boolean;
};
