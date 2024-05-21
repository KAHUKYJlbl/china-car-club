import { memo } from 'react';
import cn from 'classnames';

import { PriceType } from '../../../entities/model';
import { getAddItemsPrice, getAdds, getCurrentTax, toggleAdd } from '../../../entities/order';
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
  setIsAddProducts: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChooseOptions = memo(
  ({ prices, setIsAddProducts }: ChooseOptionsProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const adds = useAppSelector(getAdds);
    const addItemsPrice = useAppSelector(getAddItemsPrice);
    const currentTax = useAppSelector(getCurrentTax);
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
                      options: adds,
                      optionsPrices: {
                        epts: prices.eptsSbktsUtil,
                        guarantee: 0,
                        options: addItemsPrice,
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
              onClick={() => dispatch(toggleAdd('epts'))}
              className={cn(
                classes.optionsItem,
                {[classes.current]: adds.epts}
              )}
            >
              ЭПТС и СБКТС
            </div>

            <div
              onClick={() => setIsAddProducts(true)}
              className={cn(
                classes.optionsItem,
                {[classes.current]: adds.options}
              )}
            >
              Доп. товары на авто
            </div>

            <div
              onClick={() => dispatch(toggleAdd('guarantee'))}
              className={cn(
                classes.disabled,
                classes.optionsItem,
                {[classes.current]: adds.guarantee}
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
