import { memo } from 'react';

import classes from './prices.module.sass';

export const Prices = memo(
  (): JSX.Element => {
    return (
      <div className={classes.wrapper}>
        <div className={classes.divider}>
          <div className={classes.row}>
            <p>Стоимость автомобиля в Китае</p>
            <p>0 000 000 ₽</p>
          </div>

          <div className={classes.row}>
            <p>Налог на автомобиль в Китае</p>
            <p>0 ₽</p>
          </div>

          <div className={classes.row}>
            <p>Цена под ключ на границе Китая</p>
            <p>000 000 000 ₽</p>
          </div>

          <div className={classes.row}>
            <p>Fix-комиссия Chinacar.club</p>
            <p>0 ₽</p>
          </div>
        </div>

        <div className={classes.divider}>
          <div className={classes.row}>
            <p>Доп. опции на автомобиль</p>
            <p>0 ₽</p>
          </div>

          <div className={classes.row}>
            <p>ЭПТС, СБКТС и утильсбор</p>
            <p>0 ₽</p>
          </div>

          <div className={classes.row}>
            <p>Гарантия на автомобиль</p>
            <p>0 ₽</p>
          </div>
        </div>

        <div className={classes.row}>
          <p>Потенциальная скидка на поставку</p>
          <p>0 ₽</p>
        </div>
      </div>
    )
  }
);
