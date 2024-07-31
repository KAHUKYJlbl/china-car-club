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

export type ContactType = {
  typeId: number;
  priority: boolean;
  contact: string;
};

export type OfferType = {
  id: number;
  priority: number;
  price: number;
  comment: string;
  created_at: string;
  statistic_event_id: number;
  dealer_id: number;
  dealer: {
    id: number;
    name: string;
    contacts: ContactType[];
  };
};
