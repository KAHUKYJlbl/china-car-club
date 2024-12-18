import { memo } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import cn from "classnames";

import { Currencies, getCurrencyExchange } from "../../currency";
import { FILTERS } from "../../../app/settings/filters";
import { AppRoute } from "../../../app/provider/router";
import priceFormat from "../../../shared/lib/utils/price-format";

import { MycarsCalculationType } from "../lib/types";
import classes from "./calculation.module.sass";

type CalculationProps = {
  calculation: MycarsCalculationType;
  currency: {
    cny: number;
    usd: number;
  };
};

export const Calculation = memo(({ calculation, currency }: CalculationProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        classes.wrapper,
        !calculation.specification.calcVisible && classes.opacity,
        calculation.specification.series.priceListWithLogisticsByCurrentDay.length === 0 && classes.opacity,
      )}
    >
      <div className={classes.info}>
        <p className={classes.header}>
          <span>Быстрый расчет</span>

          <span className={classes.grey}>{dayjs(calculation.createdAt).locale("ru").format("D MMM, в H:mm")}</span>
        </p>

        <img
          src={`${process.env.STATIC_URL || `${window.location.origin}/storage`}/specification/${
            calculation.specification.id
          }.jpg`}
        />

        <p className={classes.model}>
          <span className={classes.bold}>
            {calculation.specification.series.manufacturer.name.ru ||
              calculation.specification.series.manufacturer.name.ch}
            <br />
            {calculation.specification.series.name.ru || calculation.specification.series.name.ch}
          </span>

          <span>{calculation.specification.name.ru || calculation.specification.name.ch}</span>

          <span className={classes.grey}>{calculation.specification.year} поколение • 2024 выпуск</span>
        </p>

        <p className={classes.properties}>
          {[
            FILTERS.engine!.elements.find(
              (element) => element.elementId === calculation.specification.parameters?.engineTypeId,
            )?.name || null,
            FILTERS.body!.elements.find(
              (element) => element.elementId === calculation.specification.parameters?.bodyTypeId,
            )?.name || null,
            calculation.specification.parameters?.driveTypeId
              ? `${
                  FILTERS.drive!.elements.find(
                    (element) => element.elementId === calculation.specification.parameters?.driveTypeId,
                  )?.name
                } привод`
              : null,
            calculation.specification.parameters?.transmissionTypeId
              ? `${
                  FILTERS.transmission!.elements.find(
                    (element) => element.elementId === calculation.specification.parameters?.transmissionTypeId,
                  )?.name
                } коробка передач`
              : null,
            calculation.specification.parameters.powerReserve &&
              `Запас\u00A0хода ${calculation.specification.parameters.powerReserve}\u00A0км`,
          ]
            .filter((value) => !!value)
            .join("\u00A0•\u00A0")}
        </p>

        {calculation.specification.series.priceListWithLogisticsByCurrentDay.length !== 0 && (
          <p className={classes.price}>
            <span className={classes.grey}>Цена в России с растаможиванием</span>
            <span className={classes.bold}>
              {priceFormat(
                getCurrencyExchange(
                  [...calculation.specification.series.priceListWithLogisticsByCurrentDay].sort(
                    (a, b) => a.price - b.price,
                  )[0].price,
                  Currencies.RUB,
                  currency,
                ),
              )}{" "}
              ₽ —{" "}
              {priceFormat(
                getCurrencyExchange(
                  [...calculation.specification.series.priceListWithLogisticsByCurrentDay].sort(
                    (a, b) => b.price - a.price,
                  )[0].price,
                  Currencies.RUB,
                  currency,
                ),
              )}{" "}
              ₽
            </span>
          </p>
        )}
      </div>

      <div className={classes.buttons}>
        {calculation.specification.calcVisible &&
        calculation.specification.series.priceListWithLogisticsByCurrentDay.length !== 0 ? (
          <button
            aria-label="перейти к расчету"
            onClick={() =>
              navigate(
                `${AppRoute.Model}?model=${calculation.specification.series.id}&spec=${calculation.specification.id}`,
              )
            }
          >
            Перейти к расчёту
          </button>
        ) : (
          <p>Комплектация недоступна</p>
        )}

        {/* <button className={classes.xbutton}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button> */}
      </div>
    </div>
  );
});
