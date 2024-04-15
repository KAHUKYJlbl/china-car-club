import { Currencies } from "../const";
import { CurrencyType } from "../types";

export const getCurrencyExchange = (cnyPrice: number, currentCurrency: Currencies, currency: CurrencyType) => {
  switch (currentCurrency) {
    case Currencies.CNY:
      return cnyPrice.toFixed();
    case Currencies.RUB:
      return (cnyPrice * currency.cny).toFixed();
    case Currencies.USD:
      return (cnyPrice * currency.cny / currency.usd).toFixed();
  }
};
