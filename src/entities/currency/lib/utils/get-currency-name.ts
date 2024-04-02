import { Currencies } from "../const";

export const getCurrencyName = (currency: Currencies) => {
  switch (currency) {
    case Currencies.RUB:
      return 'RUB';
    case Currencies.USD:
      return 'USD';
    case Currencies.CNY:
      return 'CNY';
  };
};
