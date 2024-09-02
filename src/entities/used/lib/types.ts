export type UsedCountType = {
  manufacturersCount: number;
  seriesCount: number;
  specificationsCount: number;
  adsCount: number;
};

type DataType = {
  id: number;
  name: {
    ch: string;
    ru?: string;
  };
};

type PriceType = {
  typeId: number;
  price: number;
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
  adsCount: number;
  series: DataType;
  manufacturer: DataType;
};

export type UsedAdsType = {
  id: number;
  createdAt: string;
  priceListWithLogisticsByCurrentDay: PriceType[];
  age: string;
  mileage: number;
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
