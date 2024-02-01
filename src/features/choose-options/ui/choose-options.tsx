import { memo, useState } from 'react';
import cn from 'classnames';

import { AddsType } from '../../../widgets/model-info';
import { getCurrency, getCurrencyLoadingStatus } from '../../../entities/currency';
import { PriceType } from '../../../entities/model';
import { Dropdown } from '../../../shared/ui/dropdown';
import priceFormat from '../../../shared/lib/utils/price-format';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

import classes from './choose-options.module.sass';
import getTotal from '../lib/utils/getTotal';
import { Currency, DELIVERY } from '../lib/const';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

type ChooseOptionsProps = {
  prices: PriceType;
  options: Record<AddsType, boolean>;
  optionsHandler: (arg: AddsType) => void;
}

export const ChooseOptions = memo(
  ({ prices, options, optionsHandler }: ChooseOptionsProps): JSX.Element => {
    const currency = useAppSelector(getCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
    const [ currentCurrency, setCurrentCurrency ] = useState(Currency.RUB);
    const [ currentDelivery, setCurrentDelivery ] = useState<number | null>(null);

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
                className={cn({[classes.current]: currentCurrency === Currency.RUB})}
                onClick={() => setCurrentCurrency(Currency.RUB)}
              >
                {Currency.RUB}
              </button>

              <button
                className={cn({[classes.current]: currentCurrency === Currency.USD})}
                onClick={() => setCurrentCurrency(Currency.USD)}
              >
                {Currency.USD}
              </button>

              <button
                className={cn({[classes.current]: currentCurrency === Currency.CNY})}
                onClick={() => setCurrentCurrency(Currency.CNY)}
              >
                {Currency.CNY}
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
