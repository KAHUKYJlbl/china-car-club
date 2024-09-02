import { memo } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Currencies, getCurrencyExchange } from "../../currency";
import { FILTERS } from "../../../app/settings/filters";
import { AppRoute } from "../../../app/provider/router";
import priceFormat from "../../../shared/lib/utils/price-format";

import { UsedAdsType } from "../lib/types";
import classes from "./used-card.module.sass";

dayjs.extend(relativeTime);

type FavoriteProps = {
  ads: UsedAdsType;
  currency: {
    cny: number;
    usd: number;
  };
};

export const UsedCard = memo(({ ads, currency }: FavoriteProps) => {
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <p className={classes.header}>
          <span>Объявление</span>

          <span className={classes.grey}>{dayjs(ads.createdAt).locale("ru").fromNow()}</span>
        </p>

        <img
          src={
            ads.specification.id
              ? `${process.env.STATIC_URL || `${window.location.origin}/storage`}/specification/${
                  ads.specification.id
                }.jpg`
              : "./images/noimage.jpg"
          }
        />

        <p className={classes.model}>
          <span className={classes.bold}>
            {ads.manufacturer.name.ru || ads.manufacturer.name.ru}
            <br />
            {ads.series.name.ru || ads.series.name.ch}
          </span>

          {ads.specification && (
            <>
              <span>{ads.specification.name.ru || ads.specification.name.ch}</span>
              <span className={classes.grey}>{ads.specification.year} поколение • 2024 выпуск</span>
              <span>
                Пробег {ads.mileage} км • Возраст {ads.age}
              </span>
            </>
          )}
        </p>

        <p className={classes.properties}>
          {[
            FILTERS.engine!.elements.find((element) => element.elementId === ads.specification.parameters.engineTypeId)
              ?.name || null,
            FILTERS.body!.elements.find((element) => element.elementId === ads.specification.parameters?.bodyTypeId)
              ?.name || null,
            `${
              FILTERS.drive!.elements.find((element) => element.elementId === ads.specification.parameters?.driveTypeId)
                ?.name
            } привод` || null,
            `${
              FILTERS.transmission!.elements.find(
                (element) => element.elementId === ads.specification.parameters?.transmissionTypeId
              )?.name
            } коробка передач` || null,
            ads.specification.parameters.powerReserve &&
              `Запас\u00A0хода ${ads.specification.parameters.powerReserve}\u00A0км`,
          ]
            .filter((value) => value !== null)
            .join("\u00A0•\u00A0")}
        </p>

        <p className={classes.price}>
          <span className={classes.grey}>Мин. цена в китае</span>
          <span className={classes.bold}>
            {priceFormat(
              getCurrencyExchange(ads.priceListWithLogisticsByCurrentDay[0].price, Currencies.RUB, currency)
            )}{" "}
            ₽
          </span>
        </p>
      </div>

      <div className={classes.buttons}>
        <button
          aria-label="рассчитать цену"
          onClick={() => navigate(`${AppRoute.Model}?model=${ads.series.id}&spec=${ads.specification.id}`)}
        >
          Рассчитать цену
        </button>

        <button
          // aria-label={useFavoriteList() ? "удалить из избранного" : "добавить в избранное"}
          className={classes.favorite}
          // onClick={handleFavorite}
        >
          <svg
            width="16"
            height="16"
            aria-hidden="true"
          >
            <use xlinkHref={"#favorite-add"} />
            {/* <use xlinkHref={`#${useFavoriteList() ? "favorite-remove" : "favorite-add"}`} /> */}
          </svg>
        </button>
      </div>
    </div>
  );
});
