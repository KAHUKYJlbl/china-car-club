import { LocationType } from "../../../user";

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
