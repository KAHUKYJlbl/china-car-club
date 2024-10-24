import { memo } from "react";
import cn from "classnames";

import { getAddItemsPrice, getAdds, getCurrentTax } from "../../../entities/order";
import { PriceType } from "../../../entities/model/lib/types";
import {
  Currencies,
  getCurrency,
  getCurrencyExchange,
  getCurrencyLoadingStatus,
  getCurrencyName,
  getCurrentCurrency,
  setCurrentCurrency,
} from "../../../entities/currency";
import { getTaxes } from "../../../widgets/model-info";
import priceFormat from "../../../shared/lib/utils/price-format";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";

import { getPrices } from "../lib/utils/get-prices";
import { getTotal } from "../lib/utils/get-total";
import classes from "./price-options.module.sass";

type PriceOptionsProps = {
  prices: PriceType;
  setIsTaxes: React.Dispatch<React.SetStateAction<boolean>>;
  colorsCallback: () => void;
  optionsCallback: () => void;
  addProductsCallback: () => void;
  taxesCallback: () => void;
};

export const PriceOptions = memo(
  ({
    prices,
    setIsTaxes,
    colorsCallback,
    optionsCallback,
    addProductsCallback,
    taxesCallback,
  }: PriceOptionsProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const currentTax = useAppSelector(getCurrentTax);
    const adds = useAppSelector(getAdds);
    const addItemsPrice = useAppSelector(getAddItemsPrice);
    const currency = useAppSelector(getCurrency);
    const currentCurrency = useAppSelector(getCurrentCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);

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
      }
    };

    if (currencyLoadingStatus.isLoading || !currency) {
      return <LoadingSpinner spinnerType="widget" />;
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.divider}>
          <div className={cn(classes.row, classes.bold)}>
            <p>Цена в РФ, в городе доставки</p>
            <p>
              {priceFormat(getCurrencyExchange(prices.priceInCityOfReceipt, currentCurrency, currency))}{" "}
              {currentCurrency}
            </p>
          </div>

          <div className={classes.row}>
            <p>Растаможивание и утильсбор</p>
            <p>
              {priceFormat(getCurrencyExchange(getTaxes(currentTax, prices).final, Currencies.RUB, currency))}{" "}
              {Currencies.RUB}
            </p>
          </div>

          <div className={classes.row}>
            <p>Цвет кузова и салона</p>
            <p>
              {addItemsPrice ? priceFormat(getCurrencyExchange(addItemsPrice, currentCurrency, currency)) : "0 "}{" "}
              {currentCurrency}
            </p>
          </div>
          <div className={classes.row}>
            <p>Доп. опции комплектации</p>
            <p>
              {addItemsPrice ? priceFormat(getCurrencyExchange(addItemsPrice, currentCurrency, currency)) : "0 "}{" "}
              {currentCurrency}
            </p>
          </div>
          <div className={classes.row}>
            <p>Доп. товары к авто</p>
            <p>
              {addItemsPrice ? priceFormat(getCurrencyExchange(addItemsPrice, currentCurrency, currency)) : "0 "}{" "}
              {currentCurrency}
            </p>
          </div>

          <div className={classes.row}>
            <p>
              <span>Гарантия на автомобиль</span>
            </p>
            <p>
              <span>скоро</span>
            </p>
          </div>
        </div>

        <div className={cn(classes.divider, classes.gap)}>
          <div className={cn(classes.row, classes.bold)}>
            <p>
              Цена под заказ в РФ
              <br />с растаможкой
            </p>
            <p>
              {`${priceFormat(
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
              )} ${currentCurrency}`}
            </p>
          </div>

          <div className={classes.row}>
            <button
              aria-label="подробнее о налогах"
              onClick={() => setIsTaxes(true)}
            >
              О цене и оплате
            </button>

            <button
              aria-label={getCurrencyName(currentCurrency)}
              className={classes.button}
              onClick={toggleCurrency}
            >
              {getCurrencyName(currentCurrency)}
            </button>
          </div>
        </div>

        <div className={classes.divider}>
          <div className={classes.optionsWrapper}>
            <div className={classes.option}>
              <div>
                <span className={classes.big}>Растаможивание</span>
                <span className={cn(classes.grey, classes.small)}>Выбрано: На физлицо</span>
              </div>
              <p
                className={classes.grey}
                onClick={taxesCallback}
              >
                Изменить
              </p>
            </div>

            <div className={cn(classes.option, classes.active)}>
              <div>
                <span className={classes.big}>Цвет кузова и салона</span>
                <span className={cn(classes.grey, classes.small)}>Выбрано: 1</span>
              </div>
              <p
                className={classes.grey}
                onClick={colorsCallback}
              >
                Изменить
              </p>
            </div>

            <div className={classes.option}>
              <div>
                <span className={classes.big}>Доп опции комплектации</span>
                <span className={cn(classes.grey, classes.small)}>Не выбрано</span>
              </div>
              <p
                className={classes.grey}
                onClick={optionsCallback}
              >
                Изменить
              </p>
            </div>

            <div className={classes.option}>
              <div>
                <span className={classes.big}>Доп товары к авто</span>
                <span className={cn(classes.grey, classes.small)}>Не выбрано</span>
              </div>
              <p
                className={classes.grey}
                onClick={addProductsCallback}
              >
                Изменить
              </p>
            </div>

            <div className={classes.option}>
              <div>
                <span className={classes.big}>Гарантия</span>
                <span className={cn(classes.grey, classes.small)}>Скоро появится</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
