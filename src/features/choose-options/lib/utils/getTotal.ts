import { CurrencyType, getCurrencyExchange } from '../../../../entities/currency';
import { AddsType } from '../../../../widgets/model-info';
import { Currencies } from '../../../../entities/currency';

type getTotalProps = {
  totalPrice: number,
  options: Record<AddsType, boolean>,
  optionsPrices: Record<AddsType, number>,
  currency: CurrencyType,
  currentCurrency: Currencies,
  discount?: number,
}

const getTotal = ({
  totalPrice,
  options,
  optionsPrices,
  currency,
  currentCurrency,
  discount = 0
}: getTotalProps) => {
  const optionsTotal = Object.entries(optionsPrices)
    .filter((option) => {
      const activeOptions = Object.entries(options)
        .filter((option) => option[1])
        .map((option) => option[0]);

      return activeOptions.includes(option[0])
    })
    .map((option) => option[1])
    .reduce((acc, option) => acc + option, 0);

  const cnyTotal = totalPrice + optionsTotal - discount;

  // switch (currentCurrency) {
  //   case Currencies.CNY:
  //     return cnyTotal.toFixed();
  //   case Currencies.RUB:
  //     return (cnyTotal * currency.cny).toFixed();
  //   case Currencies.USD:
  //     return (cnyTotal * currency.cny / currency.usd).toFixed();
  //   default:
  //     return null;
  // }
  return getCurrencyExchange(cnyTotal, currentCurrency, currency);
};

export default getTotal;
