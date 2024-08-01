import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';

import { getExtColors, getIntColors } from '../../../entities/specification';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

import { OrderFormType } from '../lib/types';
import classes from './colors.module.sass';

type ColorsProps = {
  onClose: () => void;
};

export const Colors = memo(
  ({ onClose }: ColorsProps) => {
    const { register, watch } = useFormContext<OrderFormType>();

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
                extColors.map((color, id) => (
                  <li
                    className={classes.row}
                    key={color.color.id}
                  >
                    <label>
                      <div className={cn(
                        classes.checkbox,
                        watch(`colors.external.${id}.value`) && classes.checked,
                      )}>
                        {
                          watch(`colors.external.${id}.value`) &&
                          <svg
                            width='20'
                            height='20'
                            aria-hidden="true"
                          >
                            <use xlinkHref="#v" />
                          </svg>
                        }

                        <input
                          type='checkbox'
                          className='visually-hidden'
                          {...register(`colors.external.${id}.value`)}
                        />
                      </div>

                      <div className={classes.colorWrapper}>
                        <div className={classes.colors}>
                          <div
                            className={classes.color}
                            style={{backgroundColor: `#${extColors[id].color.hexList[0]}`}}
                          />

                          <div
                            className={classes.color}
                            style={{backgroundColor: `#${extColors[id].color.hexList[1] || extColors[id].color.hexList[0]}`}}
                          />
                        </div>

                        <p className={classes.sublabel}>
                          {extColors[id].color.name.ru || extColors[id].color.name.ch}
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
                intColors.map((color, id) => (
                  <li
                    className={classes.row}
                    key={color.color.id}
                  >
                    <label>
                      <div className={cn(
                        classes.checkbox,
                        watch(`colors.interior.${id}.value`) && classes.checked,
                      )}>
                        {
                          watch(`colors.interior.${id}.value`) &&
                          <svg
                            width='20'
                            height='20'
                            aria-hidden="true"
                          >
                            <use xlinkHref="#v" />
                          </svg>
                        }

                        <input
                          type='checkbox'
                          className='visually-hidden'
                          {...register(`colors.interior.${id}.value`)}
                        />
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

        <button aria-label='сохранить' className={classes.saveButton} onClick={onClose}>
          Сохранить
        </button>
      </div>
    );
  }
);
