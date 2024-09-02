import { ManufacturersType } from "../../manufacturer";

export type SpecificationType = {
  id: number;
  seriesId: number;
  year: number;
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
  };
};

export type ImgUrlType = {
  original: string;
  big: string;
};

export type ColorType = {
  color: {
    id: number;
    name: {
      ru?: string;
      ch: string;
    };
    hexList: string[];
  };
  urls: ImgUrlType[];
};

export type SpecificationImageType = {
  external: ColorType[];
  interior: ColorType[];
  official: ColorType[];
};

export type ManufacturersWithSpecificationsType = ManufacturersType & {
  specificationsBySeriesId: SpecificationType[];
};

export type AddItemType = {
  id: number;
  name: string;
  fullName: string;
  description: string;
  price: number;
  tags: string[];
};

export type SpecificationAddProductsApiType = {
  groups: {
    id: number;
    name: string;
    description: string;
    items: AddItemType[];
  }[];
};

export type SpecificationAddProductsType = SpecificationAddProductsApiType & {
  specId: number;
};

export type PriceHistoryApiType = {
  data: PriceHistoryType[];
};

export type PriceHistoryType = {
  dealerPrice: number;
  factoryPrice: number;
  date: string;
};
