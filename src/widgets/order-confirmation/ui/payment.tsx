import { useFormContext } from 'react-hook-form';
import cn from 'classnames';

import { OrderFormType } from '../lib/types';
import classes from './payment.module.sass';

type PaymentProps = {};

export const Payment = ({}: PaymentProps) => {
  const { register, watch } = useFormContext<OrderFormType>();

  return (
    <div className={classes.wrapper}>
      <div>
        <p className={classes.header}>
          Выберите предпочтительные способы оплаты заказа авто из&nbsp;Китая
        </p>

        <p className={classes.subheader}>
          Выбор способа оплаты влияет на#nbsp;цены, условия и#nbsp;количество предложений от#nbsp;партнёров
        </p>
      </div>

      <ul>
        <li>
          <label className={cn(watch('paymentType.1') && classes.checked)}>
            <div className={cn(
              classes.checkbox,
              watch('paymentType.1') && classes.checked
            )}>
              {
                watch('paymentType.1') &&
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
                {...register('paymentType.1')}
              />
            </div>

            <div>
              <p>
                100% предоплата от физлица
              </p>

              <p className={classes.sublabel}>
                Цены ниже. Больше предложений
              </p>
            </div>
          </label>
        </li>

        <li>
          <label className={cn(watch('paymentType.2') && classes.checked)}>
            <div className={cn(
              classes.checkbox,
              watch('paymentType.2') && classes.checked
            )}>
              {
                watch('paymentType.2') &&
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
                {...register('paymentType.2')}
              />
            </div>

            <div>
              <p>
                100% предоплата от Юрлица
              </p>

              <p className={classes.sublabel}>
                Можно получить налоговый вычет 20%
              </p>
            </div>
          </label>
        </li>

        <li>
          <label className={cn(watch('paymentType.3') && classes.checked)}>
            <div className={cn(
              classes.checkbox,
              watch('paymentType.3') && classes.checked
            )}>
              {
                watch('paymentType.3') &&
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
                {...register('paymentType.3')}
              />
            </div>

            <div>
              <p>
                30-50% предоплата
              </p>

              <p className={classes.sublabel}>
                Остальное после доставки в Россию
              </p>
            </div>
          </label>
        </li>

        <li>
          <label className={cn(watch('paymentType.4') && classes.checked)}>
            <div className={cn(
              classes.checkbox,
              watch('paymentType.4') && classes.checked
            )}>
              {
                watch('paymentType.4') &&
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
                {...register('paymentType.4')}
              />
            </div>

            <div>
              <p>
                Покупка в кредит
              </p>

              <p className={classes.sublabel}>
                Потребуется одобрение банка
              </p>
            </div>
          </label>
        </li>

        <li>
          <label className={cn(watch('paymentType.5') && classes.checked)}>
            <div className={cn(
              classes.checkbox,
              watch('paymentType.5') && classes.checked
            )}>
              {
                watch('paymentType.5') &&
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
                {...register('paymentType.5')}
              />
            </div>

            <div>
              <p>
                Покупка в Trade-In
              </p>

              <p className={classes.sublabel}>
                Потребуется оценка вашего авто
              </p>
            </div>
          </label>
        </li>

        <li>
          <label className={cn(watch('paymentType.6') && classes.checked)}>
            <div className={cn(
              classes.checkbox,
              watch('paymentType.6') && classes.checked
            )}>
              {
                watch('paymentType.6') &&
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
                {...register('paymentType.6')}
              />
            </div>

            <div>
              <p>
                Покупка в лизинг
              </p>

              <p className={classes.sublabel}>
                Потребуется одобрение эксперта
              </p>
            </div>
          </label>
        </li>
      </ul>
    </div>
  );
};
