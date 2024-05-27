import { useFormContext } from 'react-hook-form';
import cn from 'classnames';

import { OrderFormType } from '../lib/types';
import classes from './delivery.module.sass';

type DeliveryProps = {};

export const Delivery = ({}: DeliveryProps) => {
  const { register, watch, setValue } = useFormContext<OrderFormType>();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value[0] === '0') {
      setValue('preferredDeliveryTime.maxDays', '');
      return;
    }

    if (e.target.value.length > 3) {
      setValue('preferredDeliveryTime.maxDays', e.target.value.slice(0, 3));
      return;
    }

    if (!/[0-9]/.test(e.target.value.slice(-1))) {
      setValue('preferredDeliveryTime.maxDays', e.target.value.slice(0, -1));
      return;
    }
  };

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

      <div className={classes.block}>
        <label>
          <p>Не&nbsp;дольше</p>

          <div className={classes.input}>
            <input
              type='text'
              placeholder='0'
              {...register('preferredDeliveryTime.maxDays', {onChange})}
            />

            <p>дней</p>
          </div>
        </label>
      </div>

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
    </div>
  );
};
