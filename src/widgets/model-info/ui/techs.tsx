import { memo } from 'react';

import classes from './techs.module.sass';

export const Techs = memo(
  (): JSX.Element => {
    return (
      <div className={classes.wrapper}>
        <div className={classes.row}>
          <p>Двигатель</p>
          <p>0 000 000 ₽</p>
        </div>

        <div className={classes.row}>
          <p>Трансмиссия</p>
          <p>0 ₽</p>
        </div>

        <div className={classes.row}>
          <p>Привод</p>
          <p>000 000 000 ₽</p>
        </div>

        <div className={classes.row}>
          <p>Запас хода</p>
          <p>0 ₽</p>
        </div>

        <div className={classes.row}>
          <p>Количество мест</p>
          <p>0 ₽</p>
        </div>
      </div>
    )
  }
);
