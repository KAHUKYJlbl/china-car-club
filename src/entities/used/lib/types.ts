export type UsedCountType = {
  manufacturersCount: number;
  seriesCount: number;
  specificationsCount: number;
  adsCount: number;
};

export type UsedImgType = {
  original: string;
  big: string;
};

export type UsedImgApiType = {
  external: [];
  interior: [];
  official: {
    color: {
      id: null;
      name: string;
      hex_list: [];
    };
    urls: UsedImgType[];
  }[];
};

type DataType = {
  id: number;
  name: {
    ch: string;
    ru?: string;
  };
};

type ParametrType = {
  id: number;
  name: string;
};

export type PaginationType = {
  currentPage: number;
  lastPage: number;
};

export type UsedManufacturerDataType = DataType & {
  seriesCount: number;
};

export type UsedManufacturersType = UsedCountType & {
  manufacturers: UsedManufacturerDataType[];
};

export type UsedSeriesDataType = DataType & {
  specificationsCount: number;
  manufacturer: DataType;
};

export type UsedSpecificationDataType = DataType & {
  year: number;
  adsCount: number;
  series: DataType;
  manufacturer: DataType;
};

export type UsedAdsType = {
  id: number;
  createdAt: string;
  adPrice: number;
  ageDate: string;
  ownersCount: number;
  mileage: number;
  color: string;
  specification: DataType & {
    calcVisible: false;
    year: number;
    parameters: {
      bodyTypeId: number;
      engineTypeId: number;
      transmissionTypeId: number;
      driveTypeId: number;
      powerReserve: null;
    };
  };
  series: DataType;
  manufacturer: DataType;
};

export type UsedAdsDataType = {
  data: UsedAdsType[];
  meta: PaginationType;
};

export type AdCustomsType = {
  final: number;
  fee: number;
  duty: number;
  recyclingFee: number;
  exciseTax: number;
  nds: number;
  parkingTowTruck: number;
  customsBrokerServices: number;
};

export type AdPriceType = {
  inChina: number;
  priceInCityOfReceipt: number;
  withLogisticsPers: number;
  withLogisticsCorp: number;
  withLogisticsResale: number;
  tax: number;
  eptsSbktsUtil: number;
  borderPrice: number;
  commission: number;
  customsClearancePers: AdCustomsType;
  customsClearanceCorp: AdCustomsType;
  customsClearanceResale: AdCustomsType;
};

export type UsedAdsStoreType = {
  id: number;
  createdAt: string;
  adPrice: number;
  ageDate: string;
  ownersCount: number;
  mileage: number;
  color: string;
  specification: DataType & {
    calcVisible: false;
    year: number;
    parameters: {
      bodyType: ParametrType;
      engineType: ParametrType;
      transmissionType: ParametrType;
      driveType: ParametrType;
      powerReserve: null;
      power: number;
      torque: number;
      batteryCapacity: number;
      electricPowerReserve: number;
      engineCount: string;
      seats: number[];
      lengthWidthHeight: string;
      groundClearance: number;
      curbWeight: number;
      acceleration: number;
      engineCapacity: number;
      totalFuelConsumption: number;
      wheelSize: {
        front: string;
        rear: string;
      };
    };
  };
  series: DataType;
  manufacturer: DataType;
  prices: AdPriceType;
};

export type UsedAdsApiType = {
  id: number;
  createdAt: string;
  adPrice: number;
  ageDate: string;
  ownersCount: number;
  mileage: number;
  color: string;
  specification: DataType & {
    calcVisible: false;
    year: number;
    parameters: {
      bodyType: ParametrType;
      engineType: ParametrType;
      transmissionType: ParametrType;
      driveType: ParametrType;
      powerReserve: null;
      power: number;
      torque: number;
      batteryCapacity: number;
      electricPowerReserve: number;
      engineCount: string;
      seats: number[];
      lengthWidthHeight: string;
      groundClearance: number;
      curbWeight: number;
      acceleration: number;
      engineCapacity: number;
      totalFuelConsumption: number;
      wheelSize: {
        front: string;
        rear: string;
      };
    };
  };
  series: DataType;
  manufacturer: DataType;
  prices: {
    typeId: number;
    details: {
      withLogistics: number;
      tax: number;
      eptsSbktsUtil: number;
      borderPrice: number;
      commission: number;
      priceInCityOfReceipt: number;
      customsClearance: AdCustomsType;
    };
  }[];
};
