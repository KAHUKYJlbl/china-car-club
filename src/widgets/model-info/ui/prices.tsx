import { memo, useState } from 'react';
import cn from 'classnames';

import { PriceType } from '../../../entities/model/lib/types';
import { Currencies, getCurrency, getCurrencyExchange, getCurrencyLoadingStatus, getCurrentCurrency } from '../../../entities/currency';
import priceFormat from '../../../shared/lib/utils/price-format';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import { AddsType } from '../lib/types';
import classes from './prices.module.sass';
import { Taxes } from '../lib/const';

type PricesProps = {
  prices: PriceType;
  adds: Record<AddsType, boolean>
}

export const Prices = memo(
  ({ prices, adds }: PricesProps): JSX.Element => {
    const currency = useAppSelector(getCurrency);
    const currentCurrency = useAppSelector(getCurrentCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
    const [ currentTax, setCurrentTax ] = useState(Taxes.PERS);

    if (currencyLoadingStatus.isLoading || !currency) {
      return <LoadingSpinner spinnerType='widget' />
    }


    return (
      <div className={classes.wrapper}>
        <div className={classes.divider}>
          <div className={cn(classes.row, classes.bold)}>
            <p>Мин цена на автомобиль в Китае</p>
            <p>{priceFormat((prices.inChina * currency.cny).toFixed())} {currentCurrency}</p>
          </div>

          <div className={classes.row}>
            <p>Налог на автомобиль в Китае</p>
            <p>{priceFormat(getCurrencyExchange(prices.tax, currentCurrency, currency))} {currentCurrency}</p>
          </div>

          <div className={cn(classes.row, classes.bold)}>
            <p>Цена на границе Китая</p>
            <p>{priceFormat(getCurrencyExchange(prices.borderPrice, currentCurrency, currency))} {currentCurrency}</p>
          </div>

          <div className={classes.row}>
            <p>Комиссия Chinacar.club</p>
            <p>{priceFormat(getCurrencyExchange(prices.commission, Currencies.USD, currency))} {Currencies.USD}</p>
          </div>

          <div className={cn(classes.row, classes.bold)}>
            <p>Цена в РФ, в городе доставки</p>
            <p>{priceFormat(getCurrencyExchange(prices.withLogistics, currentCurrency, currency))} {currentCurrency}</p>
          </div>
        </div>

        <div className={classes.divider}>
          <div className={cn(classes.row, classes.bold)}>
            <p>Растаможивание в России</p>
            <p>{priceFormat(getCurrencyExchange(0, Currencies.RUB, currency))} {Currencies.RUB}</p>
          </div>

          <div className={classes.row}>
            <div className={classes.buttons}>
              <button
                className={cn({[classes.current]: currentTax === Taxes.PERS})}
                onClick={() => setCurrentTax(Taxes.PERS)}
              >
                {Taxes.PERS}
              </button>

              <button
                className={cn({[classes.current]: currentTax === Taxes.CORP})}
                onClick={() => setCurrentTax(Taxes.CORP)}
              >
                {Taxes.CORP}
              </button>

            </div>

            <button>Подробнее</button>

          </div>
        </div>

        <div className={classes.divider}>
          <div className={classes.row}>
            <p>Получение ЭПТС и СБКТС</p>
            <p>
              {
                adds.epts
                ? priceFormat(getCurrencyExchange(prices.eptsSbktsUtil, Currencies.RUB, currency))
                : '0 '
              } {Currencies.RUB}
            </p>
          </div>

          <div className={classes.row}>
            <p>Доп. товары на автомобиль</p>
            <p><span>(скоро)</span> {priceFormat(getCurrencyExchange(0, currentCurrency, currency))} {currentCurrency}</p>
          </div>

          <div className={classes.row}>
            <p>Гарантия на автомобиль</p>
            <p><span>(скоро)</span> {priceFormat(getCurrencyExchange(0, Currencies.RUB, currency))} {Currencies.RUB}</p>
          </div>
        </div>
      </div>
    )
  }
);
