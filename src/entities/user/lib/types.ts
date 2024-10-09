import { NameType } from "../../../shared/lib/types";

export type LoginModeType = "init" | "phone" | "confirm-telegram" | "confirm-phone";

export type UserType = {
  hash: string;
};

export type SmsFormType = {
  msisdn: string;
};

export type SmsType = SmsFormType & {
  provider: string;
  hash: string;
};

export type ConfirmFormType = {
  pin: string;
};

export type ConfirmType = ConfirmFormType & {
  hash: string;
};

export type TokenType = {
  accessToken: string;
};

export type LocationType = {
  latitude: number | null;
  longitude: number | null;
};

export type ParametersType = {
  bodyTypeId: number;
  engineTypeId: number;
  transmissionTypeId: number;
  driveTypeId: number;
  powerReserve: number | null;
};

export type StatisticsType = {
  specificationId: number;
  specificationAdId?: number;
  customerLocation: LocationType;
  customerDelivery: {
    countryId: number | null;
    cityId: number | null;
  };
  utm: {
    utm_content: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_source: string | null;
    utm_term: string | null;
    utm_referrer: string | null;
    roistat: string | null;
    referrer: string | null;
    openstat_service: string | null;
    openstat_campaign: string | null;
    openstat_ad: string | null;
    openstat_source: string | null;
    from: string | null;
    gcclientid: string | null;
    _ym_uid: string | null;
    _ym_counter: string | null;
    gclid: string | null;
    yclid: string | null;
    fbclid: string | null;
  };
};

export type MycarsOrderType = {
  id: number;
  createdAt: string;
  dealerOffersCount: number;
  priceTypeId: number;
  availabilityOfEpts: boolean;
  addItems: string[];
  specification: {
    id: number;
    name: NameType;
    calcVisible: boolean;
    year: number;
    parameters: ParametersType;
    series: {
      id: number;
      name: NameType;
      manufacturer: {
        id: number;
        name: NameType;
      };
      priceListWithLogisticsByCurrentDay: {
        typeId: number;
        price: number;
        date: string;
      }[];
    };
  };
};

export type ApiOrderType = {
  data: MycarsOrderType[];
  meta: {
    currentPage: number;
    lastPage: number;
  };
};

export type MycarsCalculationType = {
  id: number;
  createdAt: string;
  dealerOffersCount: number;
  priceTypeId: number;
  availabilityOfEpts: boolean;
  addItems: string[];
  specification: {
    id: number;
    name: NameType;
    calcVisible: boolean;
    year: number;
    parameters: ParametersType;
    series: {
      id: number;
      name: NameType;
      manufacturer: {
        id: number;
        name: NameType;
      };
      priceListWithLogisticsByCurrentDay: {
        typeId: number;
        price: number;
        date: string;
      }[];
    };
  };
};

export type ApiCalculationType = {
  data: MycarsCalculationType[];
  meta: {
    currentPage: number;
    lastPage: number;
  };
};

export type MycarsFavoriteType = {
  id: number;
  type: number;
  createdAt: string;
  cardData: {
    manufacturer: {
      id: number;
      name: NameType;
    };
    series: {
      id: number;
      name: NameType;
    };
    specification: {
      id: number;
      name: NameType;
    };
    specificationAd?: {
      id: number;
      calcVisible: boolean;
      ownersCount: number;
      ageDate: string;
      mileage: number;
      color: string;
    };
    description: string;
    year: number;
    parameters: ParametersType;
    bodyTypeId: number;
    price: {
      min: number;
      max: number;
    };
    extra: {
      specificationCount: number;
    };
  };
};

export type ApiFavoriteType = {
  data: MycarsFavoriteType[];
  meta: {
    currentPage: number;
    lastPage: number;
    total: number;
  };
};

export type ApiFavoriteCountType = {
  count: number;
};

export type FavoriteByIdType = {
  id: number;
  favorableId: number;
};

export type FavoriteByIdApiType = FavoriteByIdType & {
  typeId: number;
};

export type FavoriteByIdRequestType = {
  typeId: number;
  favorableIds: number[];
};

export type FavoriteRequestType = {
  typeId: number;
  favorableId: number;
};
