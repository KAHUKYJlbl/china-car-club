import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import priceFormat from '../../../shared/lib/utils/price-format';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { DropdownBlocks } from '../../../shared/ui/dropdown';
import { getName } from '../../../entities/manufacturer';
import { fetchSpecificationPriceHistory, getSpecifications, getSpecificationsLoadingStatus } from '../../../entities/specification';
import { getSpecificationPriceHistory, getSpecificationPriceHistoryLoadingStatus } from '../../../entities/specification';
import { getCurrency, getCurrencyExchange, getCurrencyLoadingStatus, getCurrentCurrency } from '../../../entities/currency';

import classes from './price-history.module.sass';
import { getPriceChanges } from '../lib/utils/get-price-changes';
import dayjs from 'dayjs';

enum Prices {
  Factory = 'завода',
  Dealer = 'дилера',
};

type PriceHistoryProps = {
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
};

export const PriceHistory = ({ currentSpecification, setCurrentSpecification }: PriceHistoryProps) => {
  const dispatch = useAppDispatch();
  const [ searchParams, _setSearchParams ] = useSearchParams();

  const [ currentPrice, setCurrentPrice ] = useState(Prices.Factory);

  const priceHistory = useAppSelector(getSpecificationPriceHistory);
  const priceHistoryLoadingStatus = useAppSelector(getSpecificationPriceHistoryLoadingStatus);
  const currency = useAppSelector(getCurrency);
  const currentCurrency = useAppSelector(getCurrentCurrency);
  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
  const specifications = useAppSelector(getSpecifications);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const name = useAppSelector((state) => getName(state, Number( searchParams.get('model') )));

  useEffect(() => {
    if (currentSpecification && priceHistoryLoadingStatus.isIdle) {
      dispatch(fetchSpecificationPriceHistory(currentSpecification));
    }
  }, []);

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
              className={cn(currentPrice === Prices.Factory && classes.current)}
              onClick={() => setCurrentPrice(Prices.Factory)}
            >
              Цена {Prices.Factory}
            </button>

            <button
              className={cn(currentPrice === Prices.Dealer && classes.current)}
              onClick={() => setCurrentPrice(Prices.Dealer)}
            >
              Цена {Prices.Dealer}
            </button>
          </div>
        }

        <div className={classes.priceList}>
          <div className={classes.flexRow}>
            <p>Текущая цена {currentPrice}:</p>

            <p><span>{priceFormat(getCurrencyExchange(priceHistory[0].factoryPrice, currentCurrency, currency))} {currentCurrency}</span></p>
          </div>

          <div className={classes.flexRow}>
            <p>Min:</p>

            <p>
              {
                priceFormat(getCurrencyExchange(
                  priceHistory.toSorted((a, b) => a.factoryPrice - b.factoryPrice)[0].factoryPrice,
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
                  priceHistory.toSorted((a, b) => b.factoryPrice - a.factoryPrice)[0].factoryPrice,
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
          <li className={classes.flexRow}>
            <p>{priceHistory[0].date}</p>
            <p>
              {
                priceFormat(getCurrencyExchange(
                  priceHistory[0].factoryPrice,
                  currentCurrency,
                  currency
                ))
              } {currentCurrency}
            </p>
          </li>

          {
            getPriceChanges(priceHistory).map((price) => (
              <li className={classes.flexRow}>
                <p>{price.date}</p>
                <p>
                  {
                    priceFormat(getCurrencyExchange(
                      price.factoryPrice,
                      currentCurrency,
                      currency
                    ))
                  } {currentCurrency}
                </p>
              </li>
            ))
          }

          <li className={classes.flexRow}>
            <p>Последняя проверка</p>
            <p>{dayjs(priceHistory[0].date).locale('ru').format('DD MMMM YYYY')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
