import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Currencies, getCurrencyExchange } from "../../currency";
import { FILTERS } from "../../../app/settings/filters";
import { AppRoute } from "../../../app/provider/router";
import priceFormat from "../../../shared/lib/utils/price-format";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";

import { postFavorite } from "../model/api-actions/post-favorite";
import { deleteFavorite } from "../model/api-actions/delete-favorite";
import { getFavoritesById } from "../model/user-selectors";
import { MycarsFavoriteType } from "../lib/types";

import classes from "./favorite.module.sass";

type FavoriteProps = {
  favorite: MycarsFavoriteType;
  currency: {
    cny: number;
    usd: number;
  };
};

export const Favorite = memo(({ favorite, currency }: FavoriteProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoritesList = useAppSelector(getFavoritesById);

  const useFavoriteList = () => {
    return favoritesList.find(
      (element) => element.favorableId === (favorite.cardData.specification.id || favorite.cardData.series.id)
    )?.id;
  };

  const handleFavorite = () => {
    if (useFavoriteList()) {
      dispatch(deleteFavorite(favorite.id));
      return;
    }

    dispatch(
      postFavorite({
        typeId: favorite.type,
        favorableId: favorite.cardData.specification.id || favorite.cardData.series.id,
      })
    );
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <p className={classes.header}>
          <span>
            {FILTERS.body!.elements.find((element) => element.elementId === favorite.cardData.bodyTypeId)?.name || ""}
          </span>

          <span className={classes.grey}>{favorite.type === 1 ? "Комплектация модели" : "Модель авто"}</span>
        </p>

        <img
          src={
            favorite.cardData.specification
              ? `${process.env.STATIC_URL || `${window.location.origin}/storage`}/specification/${
                  favorite.cardData.specification.id
                }.jpg`
              : "./images/noimage.jpg"
          }
        />

        <p className={classes.model}>
          <span className={classes.bold}>
            {favorite.cardData.manufacturer.name.ru || favorite.cardData.manufacturer.name.ru}
            <br />
            {favorite.cardData.series.name.ru || favorite.cardData.series.name.ch}
          </span>

          {favorite.cardData.specification && (
            <>
              <span>{favorite.cardData.specification.name.ru || favorite.cardData.specification.name.ch}</span>
              <span className={classes.grey}>{favorite.cardData.year} поколение • 2024 выпуск</span>
            </>
          )}
        </p>

        <p className={classes.properties}>
          {favorite.cardData.specification
            ? [
                FILTERS.engine!.elements.find(
                  (element) => element.elementId === favorite.cardData.parameters.engineTypeId
                )?.name || null,
                FILTERS.body!.elements.find((element) => element.elementId === favorite.cardData.parameters?.bodyTypeId)
                  ?.name || null,
                `${
                  FILTERS.drive!.elements.find(
                    (element) => element.elementId === favorite.cardData.parameters?.driveTypeId
                  )?.name
                } привод` || null,
                `${
                  FILTERS.transmission!.elements.find(
                    (element) => element.elementId === favorite.cardData.parameters?.transmissionTypeId
                  )?.name
                } коробка передач` || null,
                favorite.cardData.parameters.powerReserve &&
                  `Запас\u00A0хода ${favorite.cardData.parameters.powerReserve}\u00A0км`,
              ]
                .filter((value) => value !== null)
                .join("\u00A0•\u00A0")
            : favorite.cardData.description}
        </p>

        <p className={classes.price}>
          <span className={classes.grey}>Мин. цена в китае</span>
          <span className={classes.bold}>
            {priceFormat(getCurrencyExchange(favorite.cardData.price.min, Currencies.RUB, currency))} ₽
            {favorite.cardData.price.max &&
              ` —
                ${priceFormat(getCurrencyExchange(favorite.cardData.price.max, Currencies.RUB, currency))} ₽`}
          </span>
        </p>
      </div>

      <div className={classes.buttons}>
        <button
          aria-label="рассчитать цену"
          onClick={() =>
            navigate(
              `${AppRoute.Model}?model=${favorite.cardData.series.id}&spec=${favorite.cardData.specification.id}`
            )
          }
        >
          Рассчитать цену
        </button>

        <button
          aria-label={useFavoriteList() ? "удалить из избранного" : "добавить в избранное"}
          className={classes.favorite}
          onClick={handleFavorite}
        >
          <svg
            width="16"
            height="16"
            aria-hidden="true"
          >
            <use xlinkHref={`#${useFavoriteList() ? "favorite-remove" : "favorite-add"}`} />
          </svg>
        </button>
      </div>
    </div>
  );
});
