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

export type ImgUrlType = {
  original: string,
  big: string,
}

export type ColorType = {
  color: {
    id: number,
    name: {
      ru?: string,
      ch: string,
    },
    hexList: string[],
  },
  urls: ImgUrlType[],
}

export type SpecificationImageType = {
  external: ColorType[],
  interior: ColorType[],
  official: ColorType[],
};

export type ManufacturersWithSpecificationsType = ManufacturersType & {
  specificationsBySeriesId: SpecificationType[];
};
