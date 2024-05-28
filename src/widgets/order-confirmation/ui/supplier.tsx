import { useFormContext } from 'react-hook-form';
import cn from 'classnames';

import { OrderFormType } from '../lib/types';
import classes from './supplier.module.sass';

type SupplierProps = {
  onClose: () => void;
};

export const Supplier = ({ onClose }: SupplierProps) => {
  const { register, watch } = useFormContext<OrderFormType>();

  return (
    <div className={classes.wrapper}>
      <div>
        <p className={classes.header}>
          Уже готовы выбрать поставщика автомобиля или пока думаете?
        </p>

        <p className={classes.subheader}>
          Выберите наиболее близкий вариант
        </p>
      </div>

      <ul>
        <li>
          <label className={cn(watch('carSupplier') === '1' && classes.checked)}>
            <div className={cn(watch('carSupplier') === '1' && classes.checked)}>
              {
                watch('carSupplier') === '1' &&
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
                value='1'
                {...register('carSupplier', {required: true})}
              />
            </div>

            Знаю какую машину хочу, выбираю поставщика
          </label>
        </li>

        <li>
          <label className={cn(watch('carSupplier') === '2' && classes.checked)}>
            <div className={cn(watch('carSupplier') === '2' && classes.checked)}>
              {
                watch('carSupplier') === '2' &&
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
                value='2'
                {...register('carSupplier', {required: true})}
              />
            </div>

            Ещё думаю, есть вопросы по&nbsp;выбору машины
          </label>
        </li>

        <li>
          <label className={cn(watch('carSupplier') === '3' && classes.checked)}>
            <div className={cn(watch('carSupplier') === '3' && classes.checked)}>
              {
                watch('carSupplier') === '3' &&
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
                value='3'
                {...register('carSupplier', {required: true})}
              />
            </div>

            Ещё думаю, посмотрю предложения и&nbsp;решу
          </label>
        </li>

        <li>
          <label className={cn(watch('carSupplier') === '4' && classes.checked)}>
            <div className={cn(watch('carSupplier') === '4' && classes.checked)}>
              {
                watch('carSupplier') === '4' &&
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
                value='4'
                {...register('carSupplier', {required: true})}
              />
            </div>

            Сейчас не&nbsp;ищу поставщика, но&nbsp;прицениваюсь на&nbsp;будущее
          </label>
        </li>

        <li>
          <label className={cn(watch('carSupplier') === '5' && classes.checked)}>
            <div className={cn(watch('carSupplier') === '5' && classes.checked)}>
              {
                watch('carSupplier') === '5' &&
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
                value='5'
                {...register('carSupplier', {required: true})}
              />
            </div>

            Просто смотрю, покупать не&nbsp;планирую
          </label>
        </li>

        <li>
          <label className={cn(watch('carSupplier') === '6' && classes.checked)}>
            <div className={cn(watch('carSupplier') === '6' && classes.checked)}>
              {
                watch('carSupplier') === '6' &&
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
                value='6'
                {...register('carSupplier', {required: true})}
              />
            </div>

            Я перепродаю машины, хочу сравнить цены
          </label>
        </li>
      </ul>

      <button className={classes.saveButton} onClick={onClose}>
        Сохранить
      </button>
    </div>
  );
};
