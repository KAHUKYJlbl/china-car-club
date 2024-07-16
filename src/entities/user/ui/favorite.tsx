import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import cn from 'classnames';

import {
  Currencies,
  getCurrencyExchange,
} from '../../currency';
import { FILTERS } from '../../../app/settings/filters';
import { AppRoute } from '../../../app/provider/router';
import priceFormat from '../../../shared/lib/utils/price-format';

import { MycarsFavoriteType } from '../lib/types';

import classes from './calculation.module.sass';

type FavoriteProps = {
  favorite: MycarsFavoriteType;
  currency: {
    cny: number;
    usd: number;
  }
};

export const Favorite = ({ favorite, currency }: FavoriteProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={classes.wrapper}
    >
      <div className={classes.info}>
        <p className={classes.header}>
          <span>
            {
              FILTERS.engine!.elements.find((element) =>
                element.elementId === favorite.cardData.bodyTypeId
              )?.name || ''
            }
          </span>

          <span className={classes.grey}>{}</span>
        </p>

        <img
          src={`${process.env.STATIC_URL}/specification/${favorite.cardData.specificationId}.jpg`}
        />

        <p className={classes.model}>
          <span className={classes.bold}>
            {favorite.cardData.manufacturer.name.ru || favorite.cardData.manufacturer.name.ru}<br/>
            {favorite.specification.series.name.ru || favorite.specification.series.name.ch}
          </span>

          <span>{favorite.specification.name.ru || favorite.specification.name.ch}</span>

          <span className={classes.grey}>{favorite.specification.year} поколение • 2024 выпуск</span>
        </p>

        <p className={classes.properties}>
          {Object.values({
            engineType: FILTERS.engine!.elements.find((element) =>
              element.elementId === favorite.specification.parameters.engineTypeId
            )?.name || '',
            bodyType: FILTERS.body!.elements.find((element) =>
              element.elementId === favorite.specification.parameters?.bodyTypeId
            )?.name || '',
            driveType: `${FILTERS.drive!.elements.find((element) =>
              element.elementId === favorite.specification.parameters?.driveTypeId
            )?.name} привод` || '',
            transmissionType: `${FILTERS.transmission!.elements.find((element) =>
              element.elementId === favorite.specification.parameters?.transmissionTypeId
            )?.name} коробка передач` || '',
          }).join(' • ')}
        </p>

        <p className={classes.price}>
          <span className={classes.grey}>Цена в России с растаможкой</span>
          <span className={classes.bold}>
            {
              priceFormat(
                getCurrencyExchange(
                  favorite.specification.series.priceListWithLogisticsByCurrentDay.toSorted((a , b) => a.price - b.price)[0].price,
                  Currencies.RUB,
                  currency
                )
              )
            } ₽ — {
              priceFormat(
                getCurrencyExchange(
                  favorite.specification.series.priceListWithLogisticsByCurrentDay.toSorted((a , b) => b.price - a.price)[0].price,
                  Currencies.RUB,
                  currency
                )
              )
            } ₽
          </span>
        </p>
      </div>

      <div className={classes.buttons}>
        {
          favorite.specification.calcVisible
            ? <button onClick={() => navigate(`${AppRoute.Model}?model=${favorite.specification.series.id}&spec=${favorite.specification.id}`)}>
              Перейти к расчету
            </button>
            : <p>
              Комплектация недоступна
            </p>
        }

        <button className={classes.xbutton}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
