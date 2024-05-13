import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import dayjs from 'dayjs';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import priceFormat from '../../../shared/lib/utils/price-format';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { DropdownBlocks } from '../../../shared/ui/dropdown';
import { getName } from '../../../entities/manufacturer';
import { fetchSpecificationPriceHistory, getSpecifications, getSpecificationsLoadingStatus } from '../../../entities/specification';
import { getSpecificationPriceHistory, getSpecificationPriceHistoryLoadingStatus } from '../../../entities/specification';
import { getCurrency, getCurrencyExchange, getCurrencyLoadingStatus, getCurrentCurrency } from '../../../entities/currency';

import { getPriceChanges } from '../lib/utils/get-price-changes';
import { PriceTypes } from '../lib/const';
import classes from './price-history.module.sass';

dayjs.updateLocale('ru', {
  monthsShort: [
    "янв", "фев", "мар", "апр", "мая", "июн",
    "июл", "авг", "сен", "окт", "ноя", "дек"
  ]
})

type PriceHistoryProps = {
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
};

export const PriceHistory = ({ currentSpecification, setCurrentSpecification }: PriceHistoryProps) => {
  const dispatch = useAppDispatch();
  const [ searchParams, _setSearchParams ] = useSearchParams();

  const [ currentPrice, setCurrentPrice ] = useState(PriceTypes.Factory);

  const priceHistory = useAppSelector(getSpecificationPriceHistory);
  const priceHistoryLoadingStatus = useAppSelector(getSpecificationPriceHistoryLoadingStatus);
  const currency = useAppSelector(getCurrency);
  const currentCurrency = useAppSelector(getCurrentCurrency);
  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
  const specifications = useAppSelector(getSpecifications);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const name = useAppSelector((state) => getName(state, Number( searchParams.get('model') )));

  useEffect(() => {
    if (currentSpecification) {
      dispatch(fetchSpecificationPriceHistory(currentSpecification));
    }
  }, [currentSpecification]);

  if (
    ! name
    || !priceHistory.length
    || !currency
    || priceHistoryLoadingStatus.isLoading
    || currencyLoadingStatus.isLoading
  ) {
    return (
      <div className={classes.wrapper}>
        <LoadingSpinner spinnerType='widget' />
      </div>
    )
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.block}>
        <h3 className={classes.header}>
          История цены в Китае
        </h3>

        <p className={classes.model}>
          <span>Автомобиль:</span><br/>{name.manufacturer}<br/>{name.model}
        </p>

        <DropdownBlocks
          currentElement={currentSpecification}
          setCurrent={setCurrentSpecification}
          placeholder='Комплектация'
          list={specifications}
          disabled={specificationsLoadingStatus.isLoading}
          isPrices
        />
      </div>

      <div className={classes.block}>
        {
          priceHistory.filter((price) => price.dealerPrice !== 0).length > 0 &&
          <div className={classes.buttonWrapper}>
            <button
              className={cn(currentPrice === PriceTypes.Factory && classes.current)}
              onClick={() => setCurrentPrice(PriceTypes.Factory)}
            >
              Цена {PriceTypes.Factory}
            </button>

            <button
              className={cn(currentPrice === PriceTypes.Dealer && classes.current)}
              onClick={() => setCurrentPrice(PriceTypes.Dealer)}
            >
              Цена {PriceTypes.Dealer}
            </button>
          </div>
        }

        <div className={classes.priceList}>
          <div className={classes.flexRow}>
            <p>Текущая цена {currentPrice}:</p>

            <p>
              <span>
                {priceFormat(
                  getCurrencyExchange(
                    priceHistory[0][currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice'],
                    currentCurrency,
                    currency
                  )
                )} {currentCurrency}
                </span>
              </p>
          </div>

          <div className={classes.flexRow}>
            <p>Min:</p>

            <p>
              {
                priceFormat(getCurrencyExchange(
                  priceHistory.toSorted((a, b) =>
                    a[currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice']
                    -
                    b[currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice']
                  )[0][currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice'],
                  currentCurrency,
                  currency
                ))
              } {currentCurrency}
            </p>
          </div>

          <div className={classes.flexRow}>
            <p>Max:</p>

            <p>
              {
                priceFormat(getCurrencyExchange(
                  priceHistory.toSorted((a, b) =>
                    b[currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice']
                    -
                    a[currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice']
                  )[0][currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice'],
                  currentCurrency,
                  currency
                ))
              } {currentCurrency}
            </p>
          </div>
        </div>
      </div>

      <div className={classes.block}>
        <div className={classes.flexRow}>
          <p>
            История изменения цены {currentPrice}
          </p>
        </div>

        <ul className={classes.priceList}>
          {
            getPriceChanges(priceHistory, currentPrice).map((price, index, array) => (
              <li
              key={price.date}
                className={classes.flexRow}
              >
                <div className={classes.priceWrapper}>
                  <p>
                    {
                      priceFormat(getCurrencyExchange(
                        price[currentPrice === PriceTypes.Factory ? 'factoryPrice' : 'dealerPrice'],
                        currentCurrency,
                        currency
                      ))
                    } {currentCurrency}
                  </p>

                  {
                    index !== array.length - 1 &&
                    <svg
                      width="18"
                      height="18"
                      aria-hidden="true"
                    >
                      <use xlinkHref={
                        (price[currentPrice === PriceTypes.Factory? 'factoryPrice' : 'dealerPrice']
                        >
                        array[index + 1][currentPrice === PriceTypes.Factory? 'factoryPrice' : 'dealerPrice'])
                        ? '#price-up'
                        : '#price-down'
                      } />
                  </svg>
                  }
                </div>
                <p>{dayjs(price.date).locale('ru').format('DD MMM YYYY')}</p>
              </li>
            ))
          }

          <li className={classes.flexRow}>
            <p>Последняя проверка</p>
            <p>{dayjs(priceHistory[0].date).locale('ru').format('DD MMM YYYY')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
