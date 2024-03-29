import { CurrencyType } from '../../../../entities/currency';
import { AddsType } from '../../../../widgets/model-info';
import { Currency } from '../const';

type getTotalProps = {
  totalPrice: number,
  options: Record<AddsType, boolean>,
  optionsPrices: Record<AddsType, number>,
  currency: CurrencyType,
  currentCurrency: Currency,
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

  const cnyTotal = totalPrice + ( optionsTotal - discount ) * currency.usd / currency.cny;

  switch (currentCurrency) {
    case Currency.CNY:
      return cnyTotal.toFixed();
    case Currency.RUB:
      return (cnyTotal * currency.cny).toFixed();
    case Currency.USD:
      return (cnyTotal * currency.cny / currency.usd).toFixed();
    default:
      return null;
  }
};

export default getTotal;
