import dayjs from 'dayjs';
import plural from 'plural-ru';

import { StatisticOrderType } from '../lib/types';

import classes from './order.module.sass';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { fetchOffers } from '../model/api-actions/fetch-offers';

type OrderProps = {
  order: StatisticOrderType;
};

export const Order = ({ order }: OrderProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <p className={classes.header}>
          <span>Заявка</span>

          <span className={classes.grey}>{dayjs(order.createdAt).locale('ru').format('D MMM, в H:mm')}</span>
        </p>

        <img
          src={`${process.env.STATIC_URL}/specification/${order.specification.id}.jpg`}
        />

        <p className={classes.model}>
          <span className={classes.bold}>
            {order.specification.series.manufacturer.name.ru || order.specification.series.manufacturer.name.ch}<br/>
            {order.specification.series.name.ru || order.specification.series.name.ch}
          </span>

          <span>{order.specification.name.ru || order.specification.name.ch}</span>

          <span className={classes.grey}>{order.specification.year} поколение • 2024 выпуск</span>
        </p>

        <p className={classes.properties}>
          <span>Растаможивание на {order.priceTypeId === 2 ? 'физлицо' : 'юрлицо'}</span>

          <span>{order.priceTypeId === 2 ? 'Для личного пользования' : 'Без вычета НДС'}</span>

          {
            order.availabilityOfEpts &&
            <span>Получение ЭПТС и СБКТС</span>
          }

          {
            order.addItems.map((item) => (
              <span key={item}>{item}</span>
            ))
          }
        </p>
      </div>

      <button
        onClick={() => dispatch(fetchOffers(order.id))}
      >
        {plural(order.dealerOffersCount, '%d предложение', '%d предложения', '%d предложений')} цены
      </button>
    </div>
  );
};
