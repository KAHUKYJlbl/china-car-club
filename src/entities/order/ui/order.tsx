import dayjs from 'dayjs';

import { StatisticEventType } from '../lib/types';

import classes from './order.module.sass';

type OrderProps = {
  order: StatisticEventType;
};

export const Order = ({ order }: OrderProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <p className={classes.header}>
          <span>Заявка</span>

          <span className={classes.grey}>{dayjs(order.createdAt).format('D MMM, в H:mm')}</span>
        </p>

        <img
          src='/images/noimage.jpg'
        />

        <p className={classes.model}>
          <p className={classes.bold}>
            {order.specification.series.manufacturer.name.ru || order.specification.series.manufacturer.name.ch}<br/>
            {order.specification.series.name.ru || order.specification.series.name.ch}
          </p>

          <span>{order.specification.name.ru || order.specification.name.ch}</span>

          <span className={classes.grey}>{order.specification.year} поколение • 2024 выпуск</span>
        </p>

        <p className={classes.properties}>
          <span>Растаможивание на физлицо</span>
          <span>Для личного пользования</span>
          <span>Получение ЭПТС и СБКТС</span>
          <span>Доп. товары на автомобиль</span>
          <span>Гарантия на автомобиль</span>
        </p>
      </div>

      <button>1 предложение цены</button>
    </div>
  );
};
