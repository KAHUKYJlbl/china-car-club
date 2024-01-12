import { memo } from 'react';

import classes from './techs.module.sass';

export const Techs = memo(
  (): JSX.Element => {
    return (
      <div className={classes.wrapper}>
        <ul className={classes.divider}>
          <li className={classes.row}>
            <p>Мощность</p>
            <p>0 000 000 ₽</p>
          </li>

          <li className={classes.row}>
            <p>Крутящий момент</p>
            <p>0 ₽</p>
          </li>

          <li className={classes.row}>
            <p>Коробка</p>
            <p>000 000 000 ₽</p>
          </li>

          <li className={classes.row}>
            <p>Длина * Ширина * Высота</p>
            <p>0 ₽</p>
          </li>

          <li className={classes.row}>
            <p>Тип кузова</p>
            <p>0 ₽</p>
          </li>

          <li className={classes.row}>
            <p>Количество мест</p>
            <p>0 ₽</p>
          </li>

          <li className={classes.row}>
            <p>Бак</p>
            <p>0 ₽</p>
          </li>

          <li className={classes.row}>
            <p>Снаряженная масса</p>
            <p>0 ₽</p>
          </li>

          <li className={classes.row}>
            <p>Объем двигателя</p>
            <p>0 ₽</p>
          </li>

          <li className={classes.row}>
            <p>Привод</p>
            <p>0 ₽</p>
          </li>

          <li className={classes.row}>
            <p>Размер колес</p>
            <p>0 ₽</p>
          </li>
        </ul>

        <div className={classes.colorsWrapper}>
          <div className={classes.colors} >
            <p>Цвета кузова</p>

            <ul className={classes.colorsList}>
              <li className={classes.colorBall}>К</li>

              <li className={classes.colorBall}>С</li>

              <li className={classes.colorBall}>Ч</li>
            </ul>
          </div>

          <div className={classes.colors} >
            <p>Цвета интерьера</p>

            <ul className={classes.colorsList}>
              <li className={classes.colorBall}>К</li>

              <li className={classes.colorBall}>С</li>

              <li className={classes.colorBall}>Ч</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
);
