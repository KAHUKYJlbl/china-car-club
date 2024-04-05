import { memo } from 'react';
import cn from 'classnames';

import { AddsType, Taxes } from '../../../widgets/model-info';
import { PriceType } from '../../../entities/model';
import { setCurrentCurrency } from '../../../entities/currency/model/currency-slice';
import { Currencies, getCurrency, getCurrencyLoadingStatus, getCurrentCurrency } from '../../../entities/currency';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import priceFormat from '../../../shared/lib/utils/price-format';

import getTotal from '../lib/utils/getTotal';
import classes from './choose-options.module.sass';

type ChooseOptionsProps = {
  prices: PriceType;
  options: Record<AddsType, boolean>;
  optionsHandler: (arg: AddsType) => void;
  currentTax: Taxes;
}

export const ChooseOptions = memo(
  ({ prices, options, optionsHandler, currentTax }: ChooseOptionsProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const currency = useAppSelector(getCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
    const currentCurrency = useAppSelector(getCurrentCurrency);

    const handleSetCurrency = (currency: Currencies) => {
      dispatch(setCurrentCurrency(currency))
    };

    if (currencyLoadingStatus.isLoading || !currency) {
      return <LoadingSpinner spinnerType='widget' />
    }


    return (
      <div className={classes.wrapper}>
        <div className={classes.block}>
          <div className={classes.prices}>
            <span className={classes.price}>
              {
                `${priceFormat(
                  getTotal({
                    totalPrice: currentTax === Taxes.PERS ? prices.withLogisticsPers : prices.withLogisticsCorp,
                    options,
                    optionsPrices: {
                      epts: prices.eptsSbktsUtil,
                      guarantee: 0,
                      options: 0
                    },
                    currency,
                    currentCurrency,
                  })
                )} ${currentCurrency}`
              }
            </span>

            <span className={classes.priceLabel}>
              Итого, поставка<br/>автомобиля из Китая<br/>с растаможкой.
            </span>

            <div className={classes.buttons}>
              <button
                className={cn({[classes.current]: currentCurrency === Currencies.RUB})}
                onClick={() => handleSetCurrency(Currencies.RUB)}
              >
                {Currencies.RUB}
              </button>

              <button
                className={cn({[classes.current]: currentCurrency === Currencies.USD})}
                onClick={() => handleSetCurrency(Currencies.USD)}
              >
                {Currencies.USD}
              </button>

              <button
                className={cn({[classes.current]: currentCurrency === Currencies.CNY})}
                onClick={() => handleSetCurrency(Currencies.CNY)}
              >
                {Currencies.CNY}
              </button>
            </div>
          </div>

          <div className={classes.options}>
            <div
              onClick={() => optionsHandler('epts')}
              className={cn(
                classes.optionsItem,
                {[classes.current]: options.epts}
              )}
            >
              ЭПТС и СБКТС
            </div>

            <div className={cn(classes.optionsItem, classes.disabled)}>
              Доп. товары на авто
            </div>

            <div
              onClick={() => optionsHandler('guarantee')}
              className={cn(
                classes.disabled,
                classes.optionsItem,
                {[classes.current]: options.guarantee}
              )}
            >
              Гарантия на авто
            </div>
          </div>
        </div>
      </div>
    )
  }
);
