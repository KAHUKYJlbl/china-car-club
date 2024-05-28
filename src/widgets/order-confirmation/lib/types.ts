export type OrderFormType = {
  firstName: string;
  comment: string;
  recommendOtherModels: boolean;
  withoutCalling: boolean;
  carSupplier: string | undefined;
  paymentType: {
    '1': boolean;
    '2': boolean;
    '3': boolean;
    '4': boolean;
    '5': boolean;
    '6': boolean;
  };
  preferredDeliveryTime: {
    maxDays: string | null;
    highPricedOption: boolean;
  };
  colors: {
    external: {id: number, value: boolean}[];
    interior: {id: number, value: boolean}[];
  }
};
