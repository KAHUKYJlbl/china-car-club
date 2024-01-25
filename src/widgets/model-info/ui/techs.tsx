import { memo } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';
import { SpecsType } from '../../../entities/model';

import classes from './techs.module.sass';
import getTechList from '../lib/utils/get-tech-list';

type TechsProps = {
  techs: SpecsType,
}

export const Techs = memo(
  ({ techs }: TechsProps): JSX.Element => {
    const techsList = getTechList(techs);

    if (!techsList) {
      return <Navigate to={AppRoute.Main} />
    }

    return (
      <div className={classes.wrapper}>
        <ul className={classes.divider}>
          {
            techsList.map((tech) => (
              <li className={classes.row}>
                <p>{tech.name}</p>
                <p className={classes.row}>{`${tech.value} ${tech.measure}`}</p>
              </li>
            ))
          }
        </ul>

        <div className={classes.colorsWrapper}>
          <div className={classes.colors} >
            <p>Цвета кузова</p>

            <ul className={classes.colorsList}>
              {
                techs.colors.external.map((color) => (
                  <li>
                    <div
                      className={classes.colorBall}
                      style={{backgroundColor: `#${color.hexList[0]}`}}
                    />

                    <div
                      className={classes.colorBall}
                      style={{backgroundColor: `#${color.hexList[1] || color.hexList[0]}`}}
                    />
                  </li>
                ))
              }
            </ul>
          </div>

          <div className={classes.colors} >
            <p>Цвета интерьера</p>

            <ul className={classes.colorsList}>
              {
                techs.colors.interior.map((color) => (
                  <li>
                    <div
                      className={classes.colorBall}
                      style={{backgroundColor: `#${color.hexList[0]}`}}
                    />

                    <div
                      className={classes.colorBall}
                      style={{backgroundColor: `#${color.hexList[1] || color.hexList[0]}`}}
                    />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
);
