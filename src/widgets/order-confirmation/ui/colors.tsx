import cn from 'classnames';

import { getExtColors, getIntColors } from '../../../entities/specification';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

import classes from './colors.module.sass';

type ColorsProps = {};

export const Colors = ({}: ColorsProps) => {
  const extColors = useAppSelector(getExtColors);
  const intColors = useAppSelector(getIntColors);

  return (
    <div className={classes.wrapper}>
      <div className={classes.block}>
        <p className={classes.header}>
          Выберите предпочтительные цвета кузова и экстерьера
        </p>

        <p className={classes.subheader}>
          Показаны только те цвета, которые доступны для вашего автомобиля и комплектации
        </p>

      </div>

      {
        (extColors && extColors[0].color) &&
        <div className={classes.block}>
          <p>Доступные цвета кузова:</p>

          <ul>
            {
              extColors.map((color) => (
                <li
                  className={classes.row}
                  key={color.color.id}
                >
                  <label>
                    <div className={cn(classes.checked, classes.checkbox)}>
                      <svg
                        width='20'
                        height='20'
                        aria-hidden="true"
                      >
                        <use xlinkHref="#v" />
                      </svg>

                      <input type='checkbox' className='visually-hidden'/>
                    </div>

                    <div className={classes.colorWrapper}>
                      <div className={classes.colors}>
                        <div
                          className={classes.color}
                          style={{backgroundColor: `#${color.color.hexList[0]}`}}
                        />

                        <div
                          className={classes.color}
                          style={{backgroundColor: `#${color.color.hexList[1] || color.color.hexList[0]}`}}
                        />
                      </div>

                      <p className={classes.sublabel}>
                        {color.color.name.ru || color.color.name.ch}
                      </p>
                    </div>
                  </label>
                </li>
              ))
            }
          </ul>
        </div>
      }

      {
        (intColors && intColors[0].color) &&
        <div className={classes.block}>
          <p>Доступные цвета салона:</p>

          <ul>
            {
              intColors.map((color) => (
                <li
                  className={classes.row}
                  key={color.color.id}
                >
                  <label>
                    <div className={cn(classes.checked, classes.checkbox)}>
                      <svg
                        width='20'
                        height='20'
                        aria-hidden="true"
                      >
                        <use xlinkHref="#v" />
                      </svg>

                      <input type='checkbox' className='visually-hidden'/>
                    </div>

                    <div className={classes.colorWrapper}>
                      <div className={classes.colors}>
                        <div
                          className={classes.color}
                          style={{backgroundColor: `#${color.color.hexList[0]}`}}
                        />

                        <div
                          className={classes.color}
                          style={{backgroundColor: `#${color.color.hexList[1] || color.color.hexList[0]}`}}
                        />
                      </div>

                      <p className={classes.sublabel}>
                        {color.color.name.ru || color.color.name.ch}
                      </p>
                    </div>
                  </label>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  );
};
