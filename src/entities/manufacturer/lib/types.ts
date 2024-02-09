export type CarsCountType = {
  manufacturersCount?: number;
  seriesCount?: number;
  specificationsCount?: number;
};

export type seriesDataType = {
  id: number;
  manufacturerId: number;
  name: {
    ch: string;
    ru?: string;
  };
}

export type ManufacturerDataType = {
  id: number;
  name: {
    ch: string;
    ru?: string;
  };
  seriesList: seriesDataType[];
};

export type ManufacturersType = CarsCountType & {
  manufacturers?: ManufacturerDataType[];
};

export type ManufacturersWithSpecsCountType = ManufacturersType & {
  specificationsCountBySeries?: Record<number, number> | null;
};
