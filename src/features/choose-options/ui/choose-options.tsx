import { memo } from 'react';
import cn from 'classnames';

import { AddsType, TaxesTypes } from '../../../widgets/model-info';
import { PriceType } from '../../../entities/model';
import { setCurrentCurrency } from '../../../entities/currency/model/currency-slice';
import { Currencies, getCurrency, getCurrencyLoadingStatus, getCurrencyName, getCurrentCurrency } from '../../../entities/currency';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import priceFormat from '../../../shared/lib/utils/price-format';

import { getTotal } from '../lib/utils/get-total';
import classes from './choose-options.module.sass';
import { getPrices } from '../lib/utils/get-prices';

type ChooseOptionsProps = {
  prices: PriceType;
  options: Record<AddsType, boolean>;
  optionsHandler: (arg: AddsType) => void;
  currentTax: TaxesTypes;
}

export const ChooseOptions = memo(
  ({ prices, options, optionsHandler, currentTax }: ChooseOptionsProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const currency = useAppSelector(getCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
    const currentCurrency = useAppSelector(getCurrentCurrency);

    const toggleCurrency = () => {
      switch (currentCurrency) {
        case Currencies.RUB:
          dispatch(setCurrentCurrency(Currencies.USD));
          break;
        case Currencies.USD:
          dispatch(setCurrentCurrency(Currencies.CNY));
          break;
        case Currencies.CNY:
          dispatch(setCurrentCurrency(Currencies.RUB));
          break;
      };
    }

    if (currencyLoadingStatus.isLoading || !currency) {
      return <LoadingSpinner spinnerType='widget' />
    }


    return (
      <div className={classes.wrapper}>
        <div className={classes.block}>
          <div className={classes.prices}>
            <div>
              <span className={classes.price}>
                {
                  `${priceFormat(
                    getTotal({
                      totalPrice: getPrices(currentTax, prices),
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
              <br/>
              <span className={classes.priceLabel}>
                Итого, поставка<br/>автомобиля из Китая<br/>с растаможкой.
              </span>
            </div>

            <button
              className={classes.button}
              onClick={toggleCurrency}
            >
              {getCurrencyName(currentCurrency)}
            </button>
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
