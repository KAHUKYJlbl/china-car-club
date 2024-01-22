import { memo } from 'react';

import { SpecsType } from '../../../entities/model';

import classes from './techs.module.sass';

type TechsProps = {
  techs: SpecsType,
}

export const Techs = memo(
  ({ techs }: TechsProps): JSX.Element => {
    return (
      <div className={classes.wrapper}>
        <ul className={classes.divider}>
          {
            !!techs.power &&
            <li className={classes.row}>
              <p>Мощность</p>
              <p className={classes.row}>{techs.power} кВт</p>
            </li>
          }

          {
            !!techs.torque &&
            <li className={classes.row}>
              <p>Крутящий момент</p>
              <p>{techs.torque} Н ⋅ м</p>
            </li>
          }

          {
            !!techs.transmissionType &&
            <li className={classes.row}>
              <p>Коробка</p>
              <p>{techs.transmissionType}</p>
            </li>
          }

          {
            !!techs.lengthWidthHeight &&
            <li className={classes.row}>
              <p>Длина * Ширина * Высота</p>
              <p>{techs.lengthWidthHeight} мм</p>
            </li>
          }

          {
            !!techs.bodyType &&
            <li className={classes.row}>
              <p>Тип кузова</p>
              <p>{techs.bodyType}</p>
            </li>
          }

          {
            !!techs.seats &&
            <li className={classes.row}>
              <p>Количество мест</p>
              <p>{techs.seats}</p>
            </li>
          }

          {
            !!techs.powerReserve &&
            <li className={classes.row}>
              <p>Бак</p>
              <p>{techs.powerReserve} Л</p>
            </li>
          }

          {
            !!techs.curbWeight &&
            <li className={classes.row}>
              <p>Снаряженная масса</p>
              <p>{techs.curbWeight} кг</p>
            </li>
          }

          {
            !!techs.engineCapacity &&
            <li className={classes.row}>
              <p>Объем двигателя</p>
              <p>{techs.engineCapacity} см.куб</p>
            </li>
          }

          {
            !!techs.driveType &&
            <li className={classes.row}>
              <p>Привод</p>
              <p>{techs.driveType}</p>
            </li>
          }

          {
            !!techs.wheelSize &&
            <li className={classes.row}>
              <p>Размер колес</p>
              <p>{`${techs.wheelSize.front} • ${techs.wheelSize.rear}`}</p>
            </li>
          }
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
