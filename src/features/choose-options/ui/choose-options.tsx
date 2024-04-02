import { memo, useState } from 'react';
import cn from 'classnames';

import { AddsType } from '../../../widgets/model-info';
import { PriceType } from '../../../entities/model';
import { setCurrentCurrency } from '../../../entities/currency/model/currency-slice';
import { Currencies, getCurrency, getCurrencyLoadingStatus, getCurrentCurrency } from '../../../entities/currency';
import { Dropdown } from '../../../shared/ui/dropdown';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import priceFormat from '../../../shared/lib/utils/price-format';

import getTotal from '../lib/utils/getTotal';
import { DELIVERY } from '../lib/const';
import classes from './choose-options.module.sass';

type ChooseOptionsProps = {
  prices: PriceType;
  options: Record<AddsType, boolean>;
  optionsHandler: (arg: AddsType) => void;
}

export const ChooseOptions = memo(
  ({ prices, options, optionsHandler }: ChooseOptionsProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const currency = useAppSelector(getCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
    const currentCurrency = useAppSelector(getCurrentCurrency);
    // const [ currentCurrency, setCurrentCurrency ] = useState(Currencies.RUB);
    const [ currentDelivery, setCurrentDelivery ] = useState<number | null>(null);

    const handleSetCurrency = (currency: Currencies) => {
      dispatch(setCurrentCurrency(currency))
    };

    if (currencyLoadingStatus.isLoading || !currency) {
      return <LoadingSpinner spinnerType='widget' />
    }


    return (
      <div className={classes.wrapper}>
        <Dropdown
          currentElement={currentDelivery}
          setCurrent={setCurrentDelivery}
          list={DELIVERY}
          placeholder='Выберите регион доставки'
        />

        <div className={classes.block}>
          <div className={classes.prices}>
            <span className={classes.price}>
              {
                `${priceFormat(String(
                  getTotal({
                    totalPrice: prices.withLogistics,
                    options,
                    optionsPrices: {
                      epts: 1000,
                      guarantee: 1000,
                      options: 0
                    },
                    currency,
                    currentCurrency,
                  })
                ))} ${currentCurrency}`
              }
            </span>

            <span className={classes.priceLabel}>
              Цена на авто под ключ
            </span>

            <span className={classes.price}>
            {
                `${priceFormat(String(
                  getTotal({
                    totalPrice: prices.withLogistics,
                    options,
                    optionsPrices: {
                      epts: 1000,
                      guarantee: 1000,
                      options: 0
                    },
                    currency,
                    currentCurrency,
                    discount: 5000
                  })
                ))} ${currentCurrency}`
              }
            </span>

            <span className={classes.priceLabel}>
              Цена со снижением
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
            <div className={classes.optionsItem}>
              Выбрать доп.опции
            </div>

            <div
              onClick={() => optionsHandler('epts')}
              className={cn(
                classes.optionsItem,
                {[classes.current]: options.epts}
              )}
            >
              ЭПТС и утильсбор
            </div>

            <div
              onClick={() => optionsHandler('guarantee')}
              className={cn(
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
