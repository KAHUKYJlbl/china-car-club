import cn from 'classnames';

import classes from './delivery.module.sass';

type DeliveryProps = {};

export const Delivery = ({}: DeliveryProps) => {
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
            <input type='text' placeholder='0' />

            <p>дней</p>
          </div>
        </label>
      </div>

      <div className={classes.block}>
        <label className={classes.checkboxLabel}>
          <div className={cn(classes.checkbox, classes.checked)}>
            <svg
              width='16'
              height='16'
              aria-hidden="true"
            >
              <use xlinkHref="#v" />
            </svg>

            <input type='checkbox' className='visually-hidden' />
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
