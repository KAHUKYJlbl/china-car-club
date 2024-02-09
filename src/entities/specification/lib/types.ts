import { ManufacturersType } from '../../manufacturer';

export type SpecificationType = {
  id: number;
  seriesId: number;
  name: {
    ch: string;
    ru: string;
  };
};

export type ManufacturersWithSpecificationsType = ManufacturersType & {
  specificationsBySeriesId: SpecificationType[];
};
