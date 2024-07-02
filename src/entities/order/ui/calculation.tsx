import dayjs from 'dayjs';

import { FILTERS } from '../../../app/settings/filters';
import { StatisticEventType } from '../lib/types';

import classes from './calculation.module.sass';
import priceFormat from '../../../shared/lib/utils/price-format';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../app/provider/router';

type CalculationProps = {
  calculation: StatisticEventType;
};

export const Calculation = ({ calculation }: CalculationProps) => {
  const navigate = useNavigate();

  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <p className={classes.header}>
          <span>Быстрый расчет</span>

          <span className={classes.grey}>{dayjs(calculation.createdAt).locale('ru').format('D MMM, в H:mm')}</span>
        </p>

        <img
          src={`${process.env.STATIC_URL}/specification/${calculation.specification.id}.jpg`}
        />

        <p className={classes.model}>
          <p className={classes.bold}>
            {calculation.specification.series.manufacturer.name.ru || calculation.specification.series.manufacturer.name.ch}<br/>
            {calculation.specification.series.name.ru || calculation.specification.series.name.ch}
          </p>

          <span>{calculation.specification.name.ru || calculation.specification.name.ch}</span>

          <span className={classes.grey}>{calculation.specification.year} поколение • 2024 выпуск</span>
        </p>

        <p className={classes.properties}>
          {Object.values({
            engineType: FILTERS.engine!.elements.find((element) =>
              element.elementId === calculation.specification.parameters.engineType.id
            )?.name || '',
            bodyType: FILTERS.body!.elements.find((element) =>
              element.elementId === calculation.specification.parameters?.bodyType.id
            )?.name || '',
            driveType: `${FILTERS.drive!.elements.find((element) =>
              element.elementId === calculation.specification.parameters?.driveType.id
            )?.name} привод` || '',
            transmissionType: `${FILTERS.transmission!.elements.find((element) =>
              element.elementId === calculation.specification.parameters?.transmissionType.id
            )?.name} коробка передач` || '',
          }).join(' • ')}
        </p>

        <p className={classes.price}>
          <span className={classes.grey}>Цена в России с растаможкой</span>
          <span className={classes.bold}>
            {priceFormat(calculation.specification.priceListWithLogisticsByCurrentDay.toSorted((a , b) => a.price - b.price)[0].price.toString())} ₽
            {` — `}
            {priceFormat(calculation.specification.priceListWithLogisticsByCurrentDay.toSorted((a , b) => b.price - a.price)[0].price.toString())} ₽
          </span>
        </p>
      </div>

      <div className={classes.buttons}>
        {
          calculation.specification.calcVisible
            ? <button onClick={() => navigate(`${AppRoute.Model}?model=${calculation.specification.series.id}&spec=${calculation.specification.id}`)}>
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
