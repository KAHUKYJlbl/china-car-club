import { memo, useState } from "react";
import cn from "classnames";

import {
  getAddedOptions,
  getAddedOptionsPrice,
  getAddItems,
  getAddItemsPrice,
  getAdds,
  getCurrentColor,
  getCurrentColorPrice,
  getCurrentTax,
} from "../../../entities/order";
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
import { getCurrentSiteMode, SiteModes } from "../../../entities/settings";
import { getSpecificationAddOptions } from "../../../entities/specification";
import { getTaxes } from "../../../widgets/model-info";
import { Modal } from "../../../shared/ui/modal";
import priceFormat from "../../../shared/lib/utils/price-format";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";

import { getPrices } from "../lib/utils/get-prices";
import { getTotal } from "../lib/utils/get-total";
import { AboutPrice } from "./about-price";
import classes from "./price-options.module.sass";

type PriceOptionsProps = {
  prices: PriceType;
  setIsTaxes: React.Dispatch<React.SetStateAction<boolean>>;
  colorsCallback: () => void;
  optionsCallback?: () => void;
  addProductsCallback: () => void;
  taxesCallback: () => void;
};

export const PriceOptions = memo(
  ({
    prices,
    // setIsTaxes,
    colorsCallback,
    optionsCallback,
    addProductsCallback,
    taxesCallback,
  }: PriceOptionsProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const [isAboutPrices, setIsAboutPrices] = useState(false);

    const currentTax = useAppSelector(getCurrentTax);
    const adds = useAppSelector(getAdds);
    const addItemsPrice = useAppSelector(getAddItemsPrice);
    const currency = useAppSelector(getCurrency);
    const currentCurrency = useAppSelector(getCurrentCurrency);
    const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);
    const addedOptionsPrice = useAppSelector(getAddedOptionsPrice);
    const addColorPrice = useAppSelector(getCurrentColorPrice);
    const currentColor = useAppSelector(getCurrentColor);
    const addedOptions = useAppSelector(getAddedOptions);
    const addedItems = useAppSelector(getAddItems);
    const addOptions = useAppSelector(getSpecificationAddOptions);
    const mode = useAppSelector(getCurrentSiteMode);

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
            <p>Цена в РФ без растаможивания</p>
            <p>
              {priceFormat(
                getCurrencyExchange(
                  prices.priceInCityOfReceipt + addColorPrice + addedOptionsPrice,
                  currentCurrency,
                  currency
                )
              )}{" "}
              {currentCurrency}
            </p>
          </div>

          {mode === SiteModes.New && (
            <>
              <div className={classes.row}>
                <p>Цвет кузова и салона</p>
                <p>
                  {addColorPrice ? priceFormat(getCurrencyExchange(addColorPrice, currentCurrency, currency)) : "0 "}{" "}
                  {currentCurrency}
                </p>
              </div>

              <div className={classes.row}>
                <p>Доп. опции комплектации</p>
                <p>
                  {addedOptionsPrice
                    ? priceFormat(getCurrencyExchange(addedOptionsPrice, currentCurrency, currency))
                    : "0 "}{" "}
                  {currentCurrency}
                </p>
              </div>
            </>
          )}

          <div className={classes.row}>
            <p>Доп. товары к авто</p>
            <p>
              {addItemsPrice ? priceFormat(getCurrencyExchange(addItemsPrice, currentCurrency, currency)) : "0 "}{" "}
              {currentCurrency}
            </p>
          </div>

          <div className={classes.row}>
            <p>Гарантия на автомобиль</p>
            <p>0 ₽</p>
          </div>
        </div>

        <div className={classes.divider}>
          <div className={classes.row}>
            <p>Растаможивание и утильсбор</p>
            <p>
              {priceFormat(
                getCurrencyExchange(getTaxes(currentTax, prices).final + prices.eptsSbktsUtil, Currencies.RUB, currency)
              )}{" "}
              {Currencies.RUB}
            </p>
          </div>
        </div>

        <div className={cn(classes.divider, classes.gap)}>
          <div className={cn(classes.row, classes.bold)}>
            <p>Цена в РФ с растаможиванием</p>
            <p>
              {`${priceFormat(
                getTotal({
                  totalPrice: getPrices(currentTax, prices) + addColorPrice + addedOptionsPrice + prices.eptsSbktsUtil,
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
              onClick={() => setIsAboutPrices(true)}
            >
              О цене и оплате
            </button>

            <button
              aria-label={getCurrencyName(currentCurrency)}
              className={classes.buttonWhite}
              onClick={toggleCurrency}
            >
              {getCurrencyName(currentCurrency)}
            </button>
          </div>
        </div>

        <div className={classes.divider}>
          <div className={classes.optionsWrapper}>
            <div
              className={cn(classes.option, classes.active)}
              onClick={taxesCallback}
            >
              <div>
                <span className={classes.big}>Растаможивание</span>
                <span className={cn(classes.grey, classes.small)}>Выбрано: {currentTax}</span>
              </div>
              <p className={classes.grey}>Изменить</p>
            </div>

            <div
              className={cn(
                classes.option,
                currentColor.ext && classes.active,
                mode === SiteModes.Used && classes.disabled
              )}
              onClick={mode === SiteModes.Used ? undefined : colorsCallback}
            >
              <div>
                <span className={classes.big}>Цвет кузова и салона</span>
                <span className={cn(classes.grey, classes.small)}>
                  {currentColor.ext ? "Выбрано: 2" : "Не выбрано"}
                </span>
              </div>
              <p className={classes.grey}>Изменить</p>
            </div>

            <div
              className={cn(
                classes.option,
                addedOptions.length && classes.active,
                (!addOptions?.options.length || mode === SiteModes.Used) && classes.disabled
              )}
              onClick={addOptions?.options.length ? optionsCallback : undefined}
            >
              <div>
                <span className={classes.big}>Доп опции комплектации</span>
                <span className={cn(classes.grey, classes.small)}>
                  {addOptions?.options.length
                    ? addedOptions.length
                      ? `Выбрано: ${addedOptions.length}`
                      : "Не выбрано"
                    : "Отсутствуют"}
                </span>
              </div>
              <p className={classes.grey}>{!!addOptions?.options.length && "Изменить"}</p>
            </div>

            <div
              className={cn(classes.option, addedItems.length && classes.active)}
              onClick={addProductsCallback}
            >
              <div>
                <span className={classes.big}>Доп товары к авто</span>
                <span className={cn(classes.grey, classes.small)}>
                  {addedItems.length ? `Выбрано: ${addedItems.length}` : "Не выбрано"}
                </span>
              </div>
              <p className={classes.grey}>Изменить</p>
            </div>

            <div className={cn(classes.option, classes.disabled)}>
              <div>
                <span className={classes.big}>Гарантия</span>
                <span className={classes.small}>Скоро появится</span>
              </div>
            </div>
          </div>
        </div>

        {isAboutPrices && (
          <Modal
            onClose={() => setIsAboutPrices(false)}
            button
          >
            <AboutPrice />
          </Modal>
        )}
      </div>
    );
  }
);
