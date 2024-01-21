import { ManufacturersType } from '../../manufacturer';

export type SpecificationType = {
  id: number;
  seriesId: number;
  name: {
    ch: string;
    ru: string;
  };
  stateId: number;
  priceWithLogisticsByCurrentDay: {
    specificationId: number;
    price: number;
  };
  priceByCurrentDay: {
    specificationId: number;
    dealerPrice: number;
    factoryPrice: number;
  }
};

export type ManufacturersWithSpecificationsType = ManufacturersType & {
  specificationsBySeriesId: SpecificationType[];
};
