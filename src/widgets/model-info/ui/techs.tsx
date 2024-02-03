import { memo } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { AppRoute } from '../../../app/provider/router';
import { getExtColors, getIntColors, getSpecificationImgLoadingStatus } from '../../../entities/specification';
import { SpecsType } from '../../../entities/model';

import classes from './techs.module.sass';
import getTechList from '../lib/utils/get-tech-list';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

type TechsProps = {
  techs: SpecsType,
  setColor: React.Dispatch<React.SetStateAction<{
    int: number | null;
    ext: number | null;
}>>,
}

export const Techs = memo(
  ({ techs, setColor }: TechsProps): JSX.Element => {
    const extColors = useAppSelector(getExtColors);
    const intColors = useAppSelector(getIntColors);
    const specificationImgLoadingStatus = useAppSelector(getSpecificationImgLoadingStatus);

    const techsList = getTechList(techs);

    if (!techsList) {
      return <Navigate to={AppRoute.Main} />
    }

    if (specificationImgLoadingStatus.isLoading) {
      return <LoadingSpinner spinnerType='widget' />
    }

    return (
      <div className={classes.wrapper}>
        <ul className={classes.divider}>
          {
            techsList.map((tech) => (
              <li className={classes.row} key={tech.name}>
                <p>{tech.name}</p>
                <p className={classes.row}>{`${tech.value} ${tech.measure}`}</p>
              </li>
            ))
          }
        </ul>

        {
          (extColors && extColors[0].color) &&
          <div className={classes.colorsWrapper}>
            <div className={classes.colors} >
              <p>Цвета кузова</p>

              <ul className={classes.colorsList}>
                {
                  extColors.map((color) => (
                    <li
                      key={color.color.id}
                      onClick={() => setColor((current) => ({...current, ext: color.color.id}))}
                    >
                      <div
                        className={classes.colorBall}
                        style={{backgroundColor: `#${color.color.hexList[0]}`}}
                      />

                      <div
                        className={classes.colorBall}
                        style={{backgroundColor: `#${color.color.hexList[1] || color.color.hexList[0]}`}}
                      />
                    </li>
                  ))
                }
              </ul>
            </div>

            {
              (intColors && intColors[0].color) &&
              <div className={classes.colors} >
                <p>Цвета интерьера</p>

                <ul className={classes.colorsList}>
                  {
                    intColors.map((color) => (
                      <li
                        key={color.color.id}
                        onClick={() => setColor((current) => ({...current, int: color.color.id}))}
                      >
                        <div
                          className={classes.colorBall}
                          style={{backgroundColor: `#${color.color.hexList[0]}`}}
                        />

                        <div
                          className={classes.colorBall}
                          style={{backgroundColor: `#${color.color.hexList[1] || color.color.hexList[0]}`}}
                        />
                      </li>
                    ))
                  }
                </ul>
              </div>
            }
          </div>
        }
      </div>
    )
  }
);
