import { ParametrApiType, PriceApiType, SeriesApiType } from "../../model";
import { LocationType } from "../../user";

export type OrderResponseType = {
  id: number;
};

export type OrderType = {
  specificationId: number,
  customerLocation: LocationType,
  customerDelivery: {
    countryId: number | null,
    cityId: number | null,
  },
  addItems: number[];
  prices: {
    totalPrice: {
      currencyQuantity: number,
      currencyId: number,
    },
    availabilityOfEpts: boolean,
    priceTypeId: number,
    minPrice: {
      currencyQuantity: number,
      currencyId: number,
    };
    tax: {
      currencyQuantity: number,
      currencyId: number,
    };
    comission: {
      currencyQuantity: number,
      currencyId: number,
    };
    borderPrice: {
      currencyQuantity: number,
      currencyId: number,
    };
    customsPrice: {
      currencyQuantity: number,
      currencyId: number,
    };
  },
};

export type AnswersType = {
  statisticsEventId: number;
  data: {
    firstName: string,
    comment: string,
    recommendOtherModels: boolean,
    withoutCalling: boolean,
    carSupplier: number[],
    paymentType: number[],
    preferredDeliveryTime: {
      maxDays: number | null,
      highPricedOption: boolean,
    },
    colors: {
        external: number[],
        interior: number[],
    }
  }
};

export type QuestionsType = {
  carSupplier: string | undefined;
  paymentType: {
    1: boolean;
    3: boolean;
    4: boolean;
    5: boolean;
    6: boolean;
  };
};

export type StatisticEventType = {
  id: number,
  typeId: number,
  price: number,
  currency: number,
  post: OrderApiType,
  createdAt: string,
  priceTypeId: null,
  clientId: number,
  specificationId: number,
  dealerOffersCount: number;
  specification: {
    id: number,
    name: {
        ch: string,
        ru: string
    },
    stateId: number,
    calcVisible: boolean,
    year: number,
    parameters: {
      engineType: ParametrApiType,
      bodyType: ParametrApiType,
      driveType: ParametrApiType,
      transmissionType: ParametrApiType,
      power: number,
      torque: number | null,
      batteryCapacity: number | null,
      powerReserve: number | null,
      electricPowerReserve: number | null,
      engineCount: number | null,
      seats: string[],
      lengthWidthHeight: string,
      groundClearance: number | null,
      curbWeight: number,
      acceleration: number | null,
      engineCapacity: number | null,
      totalFuelConsumption: number | null,
      wheelSize: {
        front: string,
        rear: string,
      },
    },
    series_id: number,
    series: SeriesApiType,
    price: PriceApiType,
    priceListWithLogisticsByCurrentDay: {
      id: number,
      type_id: number,
      price: number,
      date: string
    }[]
  }
};

export type MycarsType = {
  carCalculations: StatisticEventType[];
  carOrders: StatisticEventType[];
};

export type OrderApiType = Omit<OrderType, 'addItems'> & {
  addItems: string[];
};

export type OfferType = {
  id: number;
}
