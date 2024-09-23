import { memo } from "react";
import cn from "classnames";

import { getAddItemsPrice, getAdds, getCurrentTax, setCurrentTax } from "../../../entities/order";
import { getDealerName } from "../../../entities/settings";
import { PriceType } from "../../../entities/model/lib/types";
import {
  Currencies,
  getCurrency,
  getCurrencyExchange,
  getCurrencyLoadingStatus,
  getCurrentCurrency,
} from "../../../entities/currency";
import priceFormat from "../../../shared/lib/utils/price-format";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";

import { getTaxes } from "../lib/utils/get-taxes";
import { TaxesTypes } from "../lib/const";
import classes from "./prices.module.sass";

type PricesProps = {
  prices: PriceType;
  setIsTaxes: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Prices = memo(({ prices, setIsTaxes }: PricesProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const currentTax = useAppSelector(getCurrentTax);
  const adds = useAppSelector(getAdds);
  const addItemsPrice = useAppSelector(getAddItemsPrice);
  const currency = useAppSelector(getCurrency);
  const currentCurrency = useAppSelector(getCurrentCurrency);
  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
  const dealerName = useAppSelector(getDealerName);

  if (currencyLoadingStatus.isLoading || !currency) {
    return <LoadingSpinner spinnerType="widget" />;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.divider}>
        <div className={cn(classes.row, classes.bold)}>
          <p>Мин цена на автомобиль в Китае</p>
          <p>
            {priceFormat(getCurrencyExchange(prices.inChina, currentCurrency, currency))} {currentCurrency}
          </p>
        </div>

        {!window.location.pathname.includes("used") && (
          <div className={classes.row}>
            <p>Налог на автомобиль в Китае</p>
            <p>
              {priceFormat(getCurrencyExchange(prices.tax, currentCurrency, currency))} {currentCurrency}
            </p>
          </div>
        )}

        <div className={cn(classes.row, classes.bold)}>
          <p>Цена на границе Китая</p>
          <p>
            {priceFormat(getCurrencyExchange(prices.borderPrice, currentCurrency, currency))} {currentCurrency}
          </p>
        </div>

        <div className={classes.row}>
          <p>{`Комиссия ${dealerName}`}</p>
          <p>
            {priceFormat(getCurrencyExchange(prices.commission, Currencies.USD, currency))} {Currencies.USD}
          </p>
        </div>

        <div className={cn(classes.row, classes.bold)}>
          <p>Цена в РФ, в городе доставки</p>
          <p>
            {priceFormat(getCurrencyExchange(prices.priceInCityOfReceipt, currentCurrency, currency))} {currentCurrency}
          </p>
        </div>
      </div>

      <div className={classes.divider}>
        <div className={cn(classes.row, classes.bold)}>
          <p>Растаможивание в России</p>
          <p>
            {priceFormat(getCurrencyExchange(getTaxes(currentTax, prices).final, Currencies.RUB, currency))}{" "}
            {Currencies.RUB}
          </p>
        </div>

        <div className={classes.row}>
          <div className={classes.buttons}>
            <button
              aria-label={TaxesTypes.PERS}
              className={cn({ [classes.current]: currentTax === TaxesTypes.PERS || currentTax === TaxesTypes.SELL })}
              onClick={() => dispatch(setCurrentTax(TaxesTypes.PERS))}
            >
              {TaxesTypes.PERS}
            </button>

            <button
              aria-label={TaxesTypes.CORP}
              className={cn({ [classes.current]: currentTax === TaxesTypes.CORP || currentTax === TaxesTypes.VAT })}
              onClick={() => dispatch(setCurrentTax(TaxesTypes.CORP))}
            >
              {TaxesTypes.CORP}
            </button>
          </div>

          <button
            aria-label="подробнее о налогах"
            onClick={() => setIsTaxes(true)}
          >
            Подробнее
          </button>
        </div>
      </div>

      <div className={classes.divider}>
        <div className={classes.row}>
          <p>Получение ЭПТС и СБКТС</p>
          <p>
            {adds.epts ? priceFormat(getCurrencyExchange(prices.eptsSbktsUtil, Currencies.RUB, currency)) : "0 "}{" "}
            {Currencies.RUB}
          </p>
        </div>

        <div className={classes.row}>
          <p>Доп. товары на автомобиль</p>
          <p>
            {addItemsPrice ? priceFormat(getCurrencyExchange(addItemsPrice, currentCurrency, currency)) : "0 "}{" "}
            {currentCurrency}
          </p>
        </div>

        <div className={classes.row}>
          <p>Гарантия на автомобиль</p>
          <p>
            <span>скоро</span>
          </p>
        </div>
      </div>
    </div>
  );
});
