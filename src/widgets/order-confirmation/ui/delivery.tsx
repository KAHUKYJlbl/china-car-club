import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';

import { OrderFormType } from '../lib/types';
import classes from './delivery.module.sass';

type DeliveryProps = {
  onClose: () => void;
};

export const Delivery = memo(
  ({ onClose }: DeliveryProps) => {
    const { register, watch, setValue } = useFormContext<OrderFormType>();

    const closeHandler = () => {
      setValue('preferredDeliveryTime.maxDays', watch('preferredDeliveryTime.maxDays'), { shouldTouch: true });
      onClose();
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.block}>
          <p className={classes.header}>
            Укажите предпочтительный срок поставки авто из Китая
          </p>

          <p className={classes.subheader}>
            Срок поставки может влиять на цену поставки
          </p>
        </div>

        <ul className={classes.radio}>
          <li>
            <label className={cn(watch('preferredDeliveryTime.maxDays') === '30' && classes.checked)}>
              <div className={cn(watch('preferredDeliveryTime.maxDays') === '30' && classes.checked)}>
                {
                  watch('preferredDeliveryTime.maxDays') === '30' &&
                  <svg
                    width='20'
                    height='20'
                    aria-hidden="true"
                  >
                    <use xlinkHref="#checked" />
                  </svg>
                }

                <input
                  type='radio'
                  className='visually-hidden'
                  value='30'
                  {...register('preferredDeliveryTime.maxDays')}
                />
              </div>

              Не дольше 30 дней
            </label>
          </li>

          <li>
            <label className={cn(watch('preferredDeliveryTime.maxDays') === '45' && classes.checked)}>
              <div className={cn(watch('preferredDeliveryTime.maxDays') === '45' && classes.checked)}>
                {
                  watch('preferredDeliveryTime.maxDays') === '45' &&
                  <svg
                    width='20'
                    height='20'
                    aria-hidden="true"
                  >
                    <use xlinkHref="#checked" />
                  </svg>
                }

                <input
                  type='radio'
                  className='visually-hidden'
                  value='45'
                  {...register('preferredDeliveryTime.maxDays')}
                />
              </div>

              Не дольше 45 дней
            </label>
          </li>

          <li>
            <label className={cn(watch('preferredDeliveryTime.maxDays') === '60' && classes.checked)}>
              <div className={cn(watch('preferredDeliveryTime.maxDays') === '60' && classes.checked)}>
                {
                  watch('preferredDeliveryTime.maxDays') === '60' &&
                  <svg
                    width='20'
                    height='20'
                    aria-hidden="true"
                  >
                    <use xlinkHref="#checked" />
                  </svg>
                }

                <input
                  type='radio'
                  className='visually-hidden'
                  value='60'
                  {...register('preferredDeliveryTime.maxDays')}
                />
              </div>

              Не дольше 60 дней
            </label>
          </li>
        </ul>

        <div className={classes.block}>
          <label className={classes.checkboxLabel}>
            <div className={cn(
              classes.checkbox,
              watch('preferredDeliveryTime.highPricedOption') && classes.checked
            )}>
              {
                watch('preferredDeliveryTime.highPricedOption') &&
                <svg
                  width='16'
                  height='16'
                  aria-hidden="true"
                >
                  <use xlinkHref="#v" />
                </svg>
              }

              <input
                type='checkbox'
                className='visually-hidden'
                {...register('preferredDeliveryTime.highPricedOption')}
              />
            </div>

            Могу рассмотреть варианты в&nbsp;России с&nbsp;ценой выше
          </label>
        </div>

        <div className={classes.block}>
          <p>
            Обычные сроки поставки составляют 30−75 дней.<br />Есть три сценария:
          </p>

          <p>
            <span>Покупка из&nbsp;наличия у&nbsp;дилера в&nbsp;Китае</span><br />
            Это самый регулярный сценарий, где покупка и&nbsp;оформление идут без ожидания и&nbsp;задержек
          </p>

          <p>
            <span>Покупка после выпуска с&nbsp;завода в&nbsp;Китае</span><br />
            Возможно ожидание производства автомобиля на&nbsp;фабрике от&nbsp;7 до&nbsp;30 дней (зависит от&nbsp;загрузки и&nbsp;спроса на&nbsp;модель)
          </p>

          <p>
            <span>Покупка автомобиля из&nbsp;тех, что уже в&nbsp;пути</span><br />
            Здесь самые быстрые сроки поставки, но&nbsp;выбор меньше и&nbsp;цена может быть немного выше
          </p>
        </div>

        <button aria-label='сохранить' className={classes.saveButton} onClick={closeHandler}>
          Сохранить
        </button>
      </div>
    );
  }
);
