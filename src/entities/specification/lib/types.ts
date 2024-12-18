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
    priceInCityOfReceipt: number;
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

export type AddOptionType = {
  id: number;
  name: {
    ru?: string;
    ch: string;
  };
  description: string;
  price: number;
};

export type AddColorType = {
  id: number;
  name: {
    ru?: string;
    ch: string;
  };
  hexList: string[];
  price: number;
  imageUrl: string;
};

export type SpecificationAddOptionsApiType = {
  groups: {
    id: number;
    name: string;
    items: AddOptionType[];
  };
};

export type SpecificationAddProductsApiType = {
  groups: {
    id: number;
    name: string;
    description: string;
    items: AddItemType[];
  }[];
};

export type SpecificationAddColorsApiType = {
  groups: {
    id: number;
    name: string;
    items: AddColorType[];
  }[];
};

export type SpecificationAddOptionsType = {
  specId: number;
  options: AddOptionType[];
};

export type SpecificationAddColorsType = SpecificationAddColorsApiType & {
  specId: number;
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
