import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import cn from "classnames";

import { getSpecifications, getSpecificationsLoadingStatus } from "../../../entities/specification";
import { Currencies, getCurrency, getCurrencyExchange } from "../../../entities/currency";
import { getCurrentTax, setCurrentTax } from "../../../entities/order";
import { getShorts, SpecsType } from "../../../entities/model";
import { getName } from "../../../entities/manufacturer";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { DropdownBlocks } from "../../../shared/ui/dropdown";
import priceFormat from "../../../shared/lib/utils/price-format";

import { TaxesTypes } from "../lib/const";
import { getTaxes } from "../lib/utils/get-taxes";
import classes from "./taxes.module.sass";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";

type TaxesProps = {
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
  techs: SpecsType;
};

export const Taxes = memo(({ currentSpecification, setCurrentSpecification, techs }: TaxesProps) => {
  const dispatch = useAppDispatch();
  const [searchParams, _setSearchParams] = useSearchParams();

  const name = useAppSelector((state) => getName(state, Number(searchParams.get("model"))));
  const shorts = useAppSelector((state) => getShorts(state, currentSpecification));
  const currency = useAppSelector(getCurrency);
  const currentTax = useAppSelector(getCurrentTax);
  const specifications = useAppSelector(getSpecifications);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);

  if (!name || !currency || !shorts) {
    return (
      <div className={classes.wrapper}>
        <LoadingSpinner spinnerType="widget" />
      </div>
    );
  }

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.block}>
          <h3 className={classes.header}>Растаможка в России</h3>

          <p className={classes.model}>
            <span>Автомобиль:</span>
            <br />
            {name.manufacturer}
            <br />
            {name.model}
            <br />
          </p>

          <DropdownBlocks
            currentElement={currentSpecification}
            setCurrent={setCurrentSpecification}
            placeholder="Комплектация"
            list={specifications}
            disabled={specificationsLoadingStatus.isLoading}
            isPrices
          />

          <div>
            <div className={cn(classes.row, classes.grey)}>
              <p>Стоимость в Китае:</p>
              <p>
                {priceFormat(getCurrencyExchange(techs.price.inChina, Currencies.CNY, currency))} {Currencies.CNY}
              </p>
            </div>

            <div className={cn(classes.row, classes.grey)}>
              <p>Двигатель:</p>
              <p>{shorts.engineType}</p>
            </div>

            <div className={cn(classes.row, classes.grey)}>
              <p>Мощность двигателя:</p>
              <p>{techs.power} кВт</p>
            </div>

            <div className={cn(classes.row, classes.grey)}>
              <p>Объем двигателя:</p>
              <p>{techs.engineCapacity} см.куб</p>
            </div>
          </div>
        </div>

        <div className={classes.block}>
          <div className={classes.buttonWrapper}>
            <button
              aria-label="физлицом"
              className={cn(classes.primary, {
                [classes.current]: currentTax === TaxesTypes.PERS || currentTax === TaxesTypes.SELL,
              })}
              onClick={() => dispatch(setCurrentTax(TaxesTypes.PERS))}
            >
              Физлицом
            </button>

            <button
              aria-label="юрлицом"
              className={cn(classes.primary, {
                [classes.current]: currentTax === TaxesTypes.CORP || currentTax === TaxesTypes.VAT,
              })}
              onClick={() => dispatch(setCurrentTax(TaxesTypes.CORP))}
            >
              Юрлицом
            </button>
          </div>

          <div>
            <div className={classes.flexRow}>
              <p>сбор за таможенное оформление</p>
              <p>
                {priceFormat(getCurrencyExchange(getTaxes(currentTax, techs.price).fee, Currencies.RUB, currency))}{" "}
                {Currencies.RUB}
              </p>
            </div>

            <div className={classes.flexRow}>
              <p>таможенная пошлина</p>
              <p>
                {priceFormat(getCurrencyExchange(getTaxes(currentTax, techs.price).duty, Currencies.RUB, currency))}{" "}
                {Currencies.RUB}
              </p>
            </div>

            <div className={classes.flexRow}>
              <p>акциз</p>
              <p>
                {priceFormat(
                  getCurrencyExchange(getTaxes(currentTax, techs.price).exciseTax, Currencies.RUB, currency)
                )}{" "}
                {Currencies.RUB}
              </p>
            </div>

            <div className={classes.flexRow}>
              <p>ндс</p>
              <p>
                {priceFormat(getCurrencyExchange(getTaxes(currentTax, techs.price).nds, Currencies.RUB, currency))}{" "}
                {Currencies.RUB}
              </p>
            </div>

            <div className={classes.flexRow}>
              <p>утилизационный сбор</p>
              <p>
                {priceFormat(
                  getCurrencyExchange(getTaxes(currentTax, techs.price).recyclingFee, Currencies.RUB, currency)
                )}{" "}
                {Currencies.RUB}
              </p>
            </div>

            <div className={classes.flexRow}>
              <p>парковка СВХ + эвакуатор</p>
              <p>
                {priceFormat(
                  getCurrencyExchange(getTaxes(currentTax, techs.price).parkingTowTruck, Currencies.RUB, currency)
                )}{" "}
                {Currencies.RUB}
              </p>
            </div>

            <div className={classes.flexRow}>
              <p>услуги таможенного брокера</p>
              <p>
                {priceFormat(
                  getCurrencyExchange(getTaxes(currentTax, techs.price).customsBrokerServices, Currencies.RUB, currency)
                )}{" "}
                {Currencies.RUB}
              </p>
            </div>

            <div className={cn(classes.flexRow, classes.bold)}>
              <p>Итого, растаможка автомобиля</p>
              <p>
                {priceFormat(getCurrencyExchange(getTaxes(currentTax, techs.price).final, Currencies.RUB, currency))}{" "}
                {Currencies.RUB}
              </p>
            </div>
          </div>

          {currentTax === TaxesTypes.PERS || currentTax === TaxesTypes.SELL ? (
            <>
              <div className={classes.buttonWrapper}>
                <button
                  aria-label="для себя"
                  className={cn(classes.secondary, { [classes.current]: currentTax === TaxesTypes.PERS })}
                  onClick={() => dispatch(setCurrentTax(TaxesTypes.PERS))}
                >
                  Для себя
                </button>

                <button
                  aria-label="перепродажа повышенный утиль"
                  className={cn(classes.secondary, { [classes.current]: currentTax === TaxesTypes.SELL })}
                  onClick={() => dispatch(setCurrentTax(TaxesTypes.SELL))}
                >
                  Перепродажа / Повышенный утиль
                </button>
              </div>

              <p className={classes.grey}>
                Физлицо может ввозить один автомобиль в&nbsp;год, объёмом двигателя до&nbsp;3&nbsp;л, который остаётся
                в&nbsp;собственности данного физлица не&nbsp;менее 1&nbsp;года. Если автомобиль не&nbsp;попадает под эти
                критерии, то&nbsp;применяются повышенные коэффициенты утилизационного сбора.
              </p>
            </>
          ) : (
            <>
              <div className={classes.buttonWrapper}>
                <button
                  aria-label="без вычета ндс"
                  className={cn(classes.secondary, { [classes.current]: currentTax === TaxesTypes.CORP })}
                  onClick={() => dispatch(setCurrentTax(TaxesTypes.CORP))}
                >
                  Без вычета НДС
                </button>

                <button
                  aria-label="с вычетом ндс"
                  className={cn(classes.secondary, { [classes.current]: currentTax === TaxesTypes.VAT })}
                  onClick={() => dispatch(setCurrentTax(TaxesTypes.VAT))}
                >
                  С вычетом НДС
                </button>
              </div>

              <p className={classes.grey}>
                При ввозе автомобиля на&nbsp;юридическое лицо оно имеет право получить налоговый вычет НДС 20%
                от&nbsp;стоимости растаможки автомобиля.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
});
