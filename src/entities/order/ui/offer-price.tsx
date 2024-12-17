import cn from "classnames";

import priceFormat from "../../../shared/lib/utils/price-format";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import {
  Currencies,
  Currency,
  getCurrency,
  getCurrencyExchange,
  getCurrencyName,
  getCurrentCurrency,
  setCurrentCurrency,
} from "../../currency";

import { getDiscount } from "../lib/utils/get-discount";
import { OfferType } from "../lib/types";
import classes from "./offer-price.module.sass";
import { useState } from "react";

type OfferPriceProps = {
  offer: OfferType;
};

export const OfferPrice = ({ offer }: OfferPriceProps) => {
  const dispatch = useAppDispatch();

  const currency = useAppSelector(getCurrency);
  const currentCurrency = useAppSelector(getCurrentCurrency);

  const [isTaxes, setIsTaxes] = useState(false);

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

  if (!currency) {
    return (
      <div className={classes.wrapper}>
        <LoadingSpinner spinnerType="widget" />
      </div>
    );
  }

  return (
    <>
      <div className={classes.wrapper}>
        <p className={cn(classes.header, classes.divider)}>Покупка автомобиля под заказ</p>

        <div
          className={cn(
            classes.discount,
            offer.discount.statusId === 1 && classes.active,
            offer.discount.statusId === 2 && classes.approved,
          )}
        >
          <span className={classes.bold}>{getDiscount(offer).header}</span>
          <span>{getDiscount(offer).subheader}</span>
        </div>

        <p className={classes.divider}>
          <div className={classes.columns}>
            <p className={classes.bold}>
              Цена в РФ
              <br />
              без растаможивания
            </p>

            <p className={classes.bold}>
              <span>
                {priceFormat(
                  getCurrencyExchange(
                    offer.price.priceInCityOfReceipt +
                      (offer.colors[0]?.items[0].price || 0) +
                      (offer.colors[1]?.items[0].price || 0) +
                      offer.addOptions.reduce((acc, option) => acc + option.price, 0) +
                      offer.addItems.reduce((acc, item) => acc + item.price, 0),
                    Currencies.RUB,
                    currency,
                  ),
                )}{" "}
                {Currencies.RUB}
              </span>
              <br />
              {offer.discount.value && (
                <span className={cn(classes.bold, classes.green)}>
                  {priceFormat(getCurrencyExchange(offer.discount.value, Currencies.RUB, currency))} {Currencies.RUB}
                </span>
              )}
            </p>
          </div>

          <p>Прописывается в&nbsp;договоре на&nbsp;день подписания и&nbsp;оплачивается перед заказом автомобиля</p>

          <div>
            <p className={classes.columns}>
              <span className={classes.grey}>Включает:</span>
            </p>

            <p className={classes.columns}>
              <span>Цвет кузова и салона</span>

              <span>
                {priceFormat(
                  getCurrencyExchange(
                    (offer.colors[0]?.items[0].price || 0) + (offer.colors[1]?.items[0].price || 0),
                    Currencies.RUB,
                    currency,
                  ),
                )}{" "}
                {Currencies.RUB}
              </span>
            </p>

            <p className={classes.columns}>
              <span>Доп. опции комплектации</span>

              <span>
                {priceFormat(
                  getCurrencyExchange(
                    offer.addOptions.reduce((acc, option) => acc + option.price, 0),
                    Currencies.RUB,
                    currency,
                  ),
                )}{" "}
                {Currencies.RUB}
              </span>
            </p>

            <p className={classes.columns}>
              <span>Доп. товары/услуги к авто</span>

              <span>
                {priceFormat(
                  getCurrencyExchange(
                    offer.addItems.reduce((acc, item) => acc + item.price, 0),
                    Currencies.RUB,
                    currency,
                  ),
                )}{" "}
                {Currencies.RUB}
              </span>
            </p>
          </div>
        </p>

        <p className={classes.divider}>
          <p className={classes.columns}>
            <span className={classes.bold}>
              Растаможивание в РФ
              <br />
              на физическое лицо*
            </span>

            <span className={classes.bold}>
              {priceFormat(
                getCurrencyExchange(
                  offer.price.customsClearance.final + offer.price.eptsSbktsUtil,
                  Currencies.RUB,
                  currency,
                ),
              )}{" "}
              {Currencies.RUB}
            </span>
          </p>

          <p>
            Оплачивается после доставки автомобиля на&nbsp;таможенный терминал в&nbsp;России. Конечная стоимость
            растаможивания зависит от&nbsp;курса в&nbsp;день её&nbsp;оплаты
          </p>

          <p
            className={classes.taxes}
            onClick={() => setIsTaxes((current) => !current)}
          >
            {`${isTaxes ? "Скрыть" : "Показать"} подробный расчёт растаможивания ${isTaxes ? "↑" : "↓"}`}
          </p>

          {isTaxes && (
            <div className={classes.list}>
              <p className={classes.columns}>
                <span>сбор за таможенное оформление</span>

                <span>
                  {priceFormat(getCurrencyExchange(offer.price.customsClearance.fee, Currencies.RUB, currency))}{" "}
                  {Currencies.RUB}
                </span>
              </p>

              <p className={classes.columns}>
                <span>таможенная пошлина</span>

                <span>
                  {priceFormat(getCurrencyExchange(offer.price.customsClearance.duty, Currencies.RUB, currency))}{" "}
                  {Currencies.RUB}
                </span>
              </p>

              <p className={classes.columns}>
                <span>акциз</span>

                <span>
                  {priceFormat(getCurrencyExchange(offer.price.customsClearance.exciseTax, Currencies.RUB, currency))}{" "}
                  {Currencies.RUB}
                </span>
              </p>

              <p className={classes.columns}>
                <span>ндс</span>

                <span>
                  {priceFormat(getCurrencyExchange(offer.price.customsClearance.nds, Currencies.RUB, currency))}{" "}
                  {Currencies.RUB}
                </span>
              </p>

              <p className={classes.columns}>
                <span>утилизационный сбор</span>

                <span>
                  {priceFormat(
                    getCurrencyExchange(offer.price.customsClearance.recyclingFee, Currencies.RUB, currency),
                  )}{" "}
                  {Currencies.RUB}
                </span>
              </p>

              <p className={classes.columns}>
                <span>парковка СВХ + эвакуатор</span>

                <span>
                  {priceFormat(
                    getCurrencyExchange(offer.price.customsClearance.parkingTowTruck, Currencies.RUB, currency),
                  )}{" "}
                  {Currencies.RUB}
                </span>
              </p>

              <p className={classes.columns}>
                <span>услуги таможенного брокера</span>

                <span>
                  {priceFormat(
                    getCurrencyExchange(offer.price.customsClearance.customsBrokerServices, Currencies.RUB, currency),
                  )}{" "}
                  {Currencies.RUB}
                </span>
              </p>

              <p className={classes.columns}>
                <span>получение ЭПТС и СБКТС</span>

                <span>
                  {priceFormat(getCurrencyExchange(offer.price.eptsSbktsUtil, Currencies.RUB, currency))}{" "}
                  {Currencies.RUB}
                </span>
              </p>
            </div>
          )}

          <p className={cn(classes.grey, classes.small)}>
            * Физическое лицо может ввозить один автомобиль в&nbsp;год, объёмом двигателя до&nbsp;3&nbsp;л, который
            остаётся в&nbsp;собственности данного физлица не&nbsp;менее 1&nbsp;года. Если автомобиль не&nbsp;попадает
            под эти критерии, то применяются повышенные коэффициенты утилизационного сбора.
          </p>
        </p>

        <p className={classes.final}>
          <p className={classes.columns}>
            <span className={classes.bold}>Цена в РФ с растаможиванием</span>

            <span className={classes.bold}>
              {priceFormat(
                getCurrencyExchange(
                  offer.price.priceInCityOfReceipt +
                    (offer.colors[0]?.items[0].price || 0) +
                    (offer.colors[1]?.items[0].price || 0) +
                    offer.addOptions.reduce((acc, option) => acc + option.price, 0) +
                    offer.addItems.reduce((acc, item) => acc + item.price, 0) +
                    offer.price.eptsSbktsUtil +
                    offer.price.customsClearance.final -
                    offer.discount.value,
                  currentCurrency,
                  currency,
                ),
              )}{" "}
              {currentCurrency}
            </span>
          </p>

          <div className={classes.row}>
            <button
              aria-label="подробнее о налогах"
              // onClick={() => setIsAboutPrices(true)}
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
        </p>
      </div>

      <div className={classes.wrapper}>
        <Currency />
      </div>
    </>
  );
};
