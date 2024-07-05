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

export type StatisticOrderType = {
  id: number,
  createdAt: string;
  dealerOffersCount: number;
  priceTypeId: number;
  availabilityOfEpts: boolean;
  addItems: string[];
  specification: {
    id: number,
    name: {
        ch: string,
        ru: string
    },
    calcVisible: boolean,
    year: number,
    parameters: {
      bodyTypeId: number,
      engineTypeId: number,
      transmissionTypeId: number,
      driveTypeId: number,
      powerReserve: number | null,
    },
    series: {
      id: number;
      name: {
        ch: string;
        ru: string;
      };
      manufacturer: {
        id: number;
        name: {
          ch: string;
          ru: string;
        };
      };
      priceListWithLogisticsByCurrentDay: {
        typeId: number,
        price: number,
        date: string
      }[]
    },
  }
};

export type MycarsOrderType = {
  data: StatisticOrderType[];
  meta: {
    currentPage: number;
    total: number;
  };
};

export type StatisticCalculationType = {
  id: number,
  createdAt: string;
  dealerOffersCount: number;
  priceTypeId: number;
  availabilityOfEpts: boolean;
  addItems: string[];
  specification: {
    id: number,
    name: {
        ch: string,
        ru: string
    },
    calcVisible: boolean,
    year: number,
    parameters: {
      bodyTypeId: number,
      engineTypeId: number,
      transmissionTypeId: number,
      driveTypeId: number,
      powerReserve: number | null,
    },
    series: {
      id: number;
      name: {
        ch: string;
        ru: string;
      };
      manufacturer: {
        id: number;
        name: {
          ch: string;
          ru: string;
        };
      };
      priceListWithLogisticsByCurrentDay: {
        typeId: number,
        price: number,
        date: string
      }[]
    },
  }
};

export type MycarsCalculationType = {
  data: StatisticCalculationType[];
  meta: {
    currentPage: number;
    total: number;
  };
};

export type OfferType = {
  id: number;
}
