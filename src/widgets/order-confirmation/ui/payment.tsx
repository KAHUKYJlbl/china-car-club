import cn from 'classnames';

import classes from './payment.module.sass';

type PaymentProps = {};

export const Payment = ({}: PaymentProps) => {
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
          <label className={classes.checked}>
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
          <label>
            <div className={classes.checkbox}>
              <input type='checkbox' className='visually-hidden'/>
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
          <label>
            <div className={classes.checkbox}>
              <input type='checkbox' className='visually-hidden'/>
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
          <label>
            <div className={classes.checkbox}>
              <input type='checkbox' className='visually-hidden'/>
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
          <label>
            <div className={classes.checkbox}>
              <input type='checkbox' className='visually-hidden'/>
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
          <label>
            <div className={classes.checkbox}>
              <input type='checkbox' className='visually-hidden'/>
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
