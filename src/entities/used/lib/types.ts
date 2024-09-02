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
