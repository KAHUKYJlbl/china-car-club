import { TechNameType, TechsByTypes } from './types';

export enum TaxesTypes {
  PERS = 'Физлицо',
  SELL = 'На перепродажу',
  CORP = 'Юрлицо',
  VAT = 'Без НДС',
};

export enum PriceTypes {
  Factory = 'завода',
  Dealer = 'дилера',
};

export const Statuses = [
  '',
  'В продаже',
  'Снят с производства и в продаже',
  'Продажи прекращены',
  'Скоро',
];

export const ELECTRO = [3];

export const HYBRID = [5, 6, 7, 8, 9, 10];

export const ICE = [1, 2, 4];

export const TECHS_BY_TYPES: Record<string, TechsByTypes> = {
  bodyType: {
    electro: true,
    hybrid: true,
    ice: true,
  },
  driveType: {
    electro: true,
    hybrid: true,
    ice: true,
  },
  transmissionType: {
    electro: true,
    hybrid: true,
    ice: true,
  },
  power: {
    electro: true,
    hybrid: true,
    ice: true,
  },
  torque: {
    electro: true,
    hybrid: true,
    ice: true,
  },
  batteryCapacity: {
    electro: true,
    hybrid: true,
    ice: false,
  },
  powerReserve: {
    electro: false,
    hybrid: true,
    ice: true,
  },
  electricPowerReserve: {
    electro: true,
    hybrid: true,
    ice: false,
  },
  engineCount: {
    electro: true,
    hybrid: true,
    ice: false,
  },
  seats: {
    electro: true,
    hybrid: true,
    ice: true,
  },
  lengthWidthHeight: {
    electro: true,
    hybrid: true,
    ice: true,
  },
  groundClearance: {
    electro: true,
    hybrid: true,
    ice: true,
  },
  curbWeight: {
    electro: true,
    hybrid: true,
    ice: true,
  },
  engineCapacity: {
    electro: false,
    hybrid: true,
    ice: true,
  },
  frontWheel: {
    electro: true,
    hybrid: true,
    ice: true,
  },
  rearWheel: {
    electro: true,
    hybrid: true,
    ice: true,
  },
}

export const TECH_NAMES: Record<string, TechNameType> = {
  bodyType: {
    name: 'Кузов',
    measure: '',
  },
  driveType: {
    name: 'Привод',
    measure: '',
  },
  transmissionType: {
    name: 'Коробка',
    measure: '',
  },
  power: {
    name: 'Мощность двигателя',
    measure: 'кВт',
  },
  torque: {
    name: 'Крутящий момент',
    measure: 'Н ⋅ м',
  },
  batteryCapacity: {
    name: 'Батарея',
    measure: 'кВт ⋅ ч'
  },
  electricPowerReserve: {
    name: 'Запас хода на батарее',
    measure: 'км',
  },
  powerReserve: {
    name: 'Запас хода на топливе',
    measure: 'км',
  },
  engineCount: {
    name: 'Количество двигателей',
    measure: '',
  },
  seats: {
    name: 'Количество мест',
    measure: '',
  },
  lengthWidthHeight: {
    name: 'Длина * Ширина * Высота',
    measure: 'мм',
  },
  groundClearance: {
    name: 'Клиренс',
    measure: 'мм',
  },
  curbWeight: {
    name: 'Снаряженная масса',
    measure: 'кг',
  },
  acceleration: {
    name: 'Разгон до 100',
    measure: 'с',
  },
  totalFuelConsumption: {
    name: 'Расход на 100км',
    measure: 'л',
  },
  engineCapacity: {
    name: 'Объем двигателя',
    measure: 'см.куб',
  },
  frontWheel: {
    name: 'Передние колеса',
    measure: '',
  },
  rearWheel: {
    name: 'Задние колеса',
    measure: '',
  },
}
