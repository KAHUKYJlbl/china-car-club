import { NameType } from "../../../shared/lib/types";
import { LocationType } from "../../user";

export type OrderResponseType = {
  id: number;
};

export type OrderType = {
  specificationId: number;
  specificationAdId?: number;
  customerLocation: LocationType;
  customerDelivery: {
    countryId: number | null;
    cityId: number | null;
  };
  addItems: number[];
  addOptions?: number[];
  colors?: {
    external: number[];
    interior: number[];
  };
  prices: {
    totalPrice: {
      currencyQuantity: number;
      currencyId: number;
    };
    availabilityOfEpts: boolean;
    priceTypeId: number;
    minPrice: {
      currencyQuantity: number;
      currencyId: number;
    };
    tax: {
      currencyQuantity: number;
      currencyId: number;
    };
    comission: {
      currencyQuantity: number;
      currencyId: number;
    };
    borderPrice: {
      currencyQuantity: number;
      currencyId: number;
    };
    customsPrice: {
      currencyQuantity: number;
      currencyId: number;
    };
  };
};

export type AnswersType = {
  statisticsEventId: number;
  data: {
    firstName: string;
    comment: string;
    recommendOtherModels: boolean;
    withoutCalling: boolean;
    carSupplier: number[];
    paymentType: number[];
    preferredDeliveryTime: {
      maxDays: number | null;
      highPricedOption: boolean;
    };
    colors: {
      external: number[];
      interior: number[];
    };
  };
};

export type QuestionsType = {
  carSupplier: string | undefined;
  paymentType: {
    1: boolean;
    4: boolean;
    5: boolean;
    6: boolean;
    7: boolean;
  };
};

export type ContactType = {
  typeId: number;
  priority: boolean;
  contact: string;
};

export type ManagerType = {
  name: string;
  contacts: {
    typeId: number;
    prioroty: boolean;
    contact: string;
  }[];
};

export type OfferType = {
  id: number;
  statisticEventId: number;
  comment: string;
  manager: ManagerType;
  colors: {
    id: number;
    name: string;
    items: [
      {
        id: number;
        name: NameType;
        hexList: [string, string];
        price: number;
        imageUrl: string;
      },
    ];
  }[];
  addOptions: {
    id: number;
    name: NameType;
    description: string;
    price: number;
  }[];
  addItems: {
    id: 1;
    name: string;
    fullName: string;
    description: string;
    price: number;
    tags: [];
  }[];
  price: {
    inChina: number;
    withLogistics: number;
    tax: number;
    eptsSbktsUtil: number;
    borderPrice: number;
    commission: number;
    priceInCityOfReceipt: number;
    customsClearance: {
      final: number;
      fee: number;
      duty: number;
      recyclingFee: number;
      exciseTax: number;
      nds: number;
      parkingTowTruck: number;
      customsBrokerServices: number;
    };
  };
  priceTypeId: number;
  discount: {
    statusId: number;
    expiredAt: string;
    value: number;
  };
  delivery: {
    firstDate: string;
    lastDate: string;
    statusList: {
      name: string;
      description: string;
      active: boolean;
    }[];
  };
  specification: {
    id: number;
    name: NameType;
    parameters: {
      engineType: {
        id: number;
        name: string;
      };
      bodyType: {
        id: number;
        name: string;
      };
      driveType: {
        id: number;
        name: string;
      };
      transmissionType: {
        id: number;
        name: string;
      };
      power: number;
      torque: number;
      batteryCapacity: number;
      powerReserve: number;
      electricPowerReserve: number;
      engineCount: string;
      seats: number[];
      lengthWidthHeight: string;
      groundClearance: number;
      curbWeight: number;
      acceleration: number;
      engineCapacity: number;
      totalFuelConsumption: number;
      wheelSize: {
        front: string;
        rear: string;
      };
    };
  };
  series: {
    id: number;
    name: NameType;
  };
  manufacturer: {
    id: number;
    name: NameType;
  };
};

export type OfferStateType = "order" | "price" | "delivery";
