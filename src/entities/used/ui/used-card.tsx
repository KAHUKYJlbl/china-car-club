import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import plural from "plural-ru";

import {
  deleteFavorite,
  fetchHash,
  getAuthStatus,
  getCurrentCity,
  getGeolocation,
  Login,
  postFavorite,
  postRefresh,
  resetMycarsFavoritesCountLoadingStatus,
} from "../../user";
import { Currencies, getCurrencyExchange } from "../../currency";
import { FILTERS } from "../../../app/settings/filters";
import { AppRoute } from "../../../app/provider/router";
import priceFormat from "../../../shared/lib/utils/price-format";
import capitalize from "../../../shared/lib/utils/capitalize";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useUtm } from "../../../shared/lib/hooks/use-utm";

import { postUsedStatistics } from "../model/api-actions/post-used-statistics";
import { UsedAdsType } from "../lib/types";
import classes from "./used-card.module.sass";

dayjs.extend(relativeTime);

type UsedCardProps = {
  ads: UsedAdsType;
  currency: {
    cny: number;
    usd: number;
  };
  isFavorite: number | undefined;
};

export const UsedCard = memo(({ ads, currency, isFavorite }: UsedCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const utm = useUtm();

  const [isLogin, setIsLogin] = useState(false);
  const [isFavoriteLogin, setIsFavoriteLogin] = useState(false);

  const isAuth = useAppSelector(getAuthStatus);
  const city = useAppSelector(getCurrentCity);
  const geolocation = useAppSelector(getGeolocation);

  const onLogin = () => {
    if (isFavoriteLogin) {
      favoriteHandler();
    } else {
      statisticsHandler();
    }
    setIsLogin(false);
  };

  const favoriteHandler = () => {
    if (isFavorite) {
      dispatch(resetMycarsFavoritesCountLoadingStatus());
      dispatch(deleteFavorite(isFavorite));
      return;
    }

    if (isAuth || isFavoriteLogin) {
      dispatch(resetMycarsFavoritesCountLoadingStatus());
      dispatch(
        postFavorite({
          typeId: 3,
          favorableId: ads.id,
        })
      );
      setIsFavoriteLogin(false);
      return;
    }

    setIsFavoriteLogin(true);
    dispatch(fetchHash());
    setIsLogin(true);
  };

  const statisticsHandler = () => {
    dispatch(
      postUsedStatistics({
        specificationId: ads.specification.id,
        specificationAdId: ads.id,
        customerLocation: geolocation,
        customerDelivery: {
          countryId: null,
          cityId: city,
        },
        utm,
      })
    ).then(() => {
      dispatch(postRefresh());
    });

    navigate(`${AppRoute.Used}${AppRoute.Model}?model=${ads.series.id}&spec=${ads.specification.id}&ad=${ads.id}`);
  };

  const calculateHandler = () => {
    if (isAuth) {
      statisticsHandler();
    } else {
      dispatch(fetchHash());
      setIsLogin(true);
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.info}>
          <p className={classes.header}>
            <span>Объявление</span>

            <span className={classes.grey}>{capitalize(dayjs(ads.createdAt).locale("ru").fromNow())}</span>
          </p>

          <img
            src={
              ads.specification.id
                ? `${process.env.STATIC_URL || `${window.location.origin}/storage`}/specification_ad/${ads.id}/1.jpg`
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
                <span className={classes.grey}>
                  {ads.specification.year} поколение •{" "}
                  {ads.ownersCount
                    ? plural(ads.ownersCount, "%d владелец", "%d владельца", "%d владельцев")
                    : "На учет не вставал"}
                </span>
                <span>
                  Пробег {ads.mileage} км • Возраст{" "}
                  {`${
                    dayjs().diff(dayjs(ads.ageDate), "years") === 0
                      ? ""
                      : plural(dayjs().diff(dayjs(ads.ageDate), "years"), "%d год", "%d года", "%d лет")
                  } ${(dayjs().diff(dayjs(ads.ageDate), "M") % 12) + 1} мес`}
                </span>
              </>
            )}
          </p>

          <p className={classes.properties}>
            {[
              FILTERS.engine!.elements.find(
                (element) => element.elementId === ads.specification.parameters.engineTypeId
              )?.name || null,
              FILTERS.body!.elements.find((element) => element.elementId === ads.specification.parameters?.bodyTypeId)
                ?.name || null,
              `${
                FILTERS.drive!.elements.find(
                  (element) => element.elementId === ads.specification.parameters?.driveTypeId
                )?.name
              } привод` || null,
              `${
                FILTERS.transmission!.elements.find(
                  (element) => element.elementId === ads.specification.parameters?.transmissionTypeId
                )?.name
              } коробка передач` || null,
              ads.specification.parameters.powerReserve &&
                `Запас\u00A0хода ${ads.specification.parameters.powerReserve}\u00A0км`,
              ads.color && `${ads.color}\u00A0кузов`,
            ]
              .filter((value) => value !== null)
              .join("\u00A0•\u00A0")}
          </p>

          <p className={classes.price}>
            <span className={classes.grey}>Цена в китае</span>
            <span className={classes.bold}>
              {priceFormat(getCurrencyExchange(ads.adPrice, Currencies.RUB, currency))} ₽
            </span>
          </p>
        </div>

        <div className={classes.buttons}>
          <button
            aria-label="рассчитать цену"
            onClick={calculateHandler}
          >
            Рассчитать цену
          </button>

          <button
            aria-label={!!isFavorite ? "удалить из избранного" : "добавить в избранное"}
            className={classes.favorite}
            onClick={favoriteHandler}
          >
            <svg
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref={!!isFavorite ? "#favorite-remove" : "#favorite-add"} />
            </svg>
          </button>
        </div>
      </div>

      {isLogin && (
        <Login
          onClose={() => setIsLogin(false)}
          onLogin={onLogin}
        />
      )}
    </>
  );
});
