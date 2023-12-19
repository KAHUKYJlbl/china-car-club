import { memo } from 'react';

import { Dropdown } from '../../../shared/ui/dropdown';

import classes from './choose-delivery.module.sass';

export const ChooseDelivery = memo(
  (): JSX.Element => {
    return (
      <div className={classes.wrapper}>
        <p>
          <span className={classes.bold}>
            Рассчитайте цену под заказ из Китая
          </span>

          <br/>и сравните условия «под ключ» по каждой комплектации автомобиля
        </p>

        <div className={classes.controls}>
          <Dropdown
            currentElement={null}
            setCurrent={() => null}
            placeholder='Страна получения авто'
            list={[{ name:'Россия', id: 1 }]}
          />
          <Dropdown
            currentElement={null}
            setCurrent={() => null}
            placeholder='Город получения авто'
            list={[{ name:'Москва', id: 1 }]}
          />
        </div>

        <button className={classes.button}>Быстрый онлайн-расчет под ключ</button>

        <p className={classes.small}>
          Нажимая кнопку, даю согласие на обработку моих персональных данных в соответствии с политикой конфиденциальности
        </p>
      </div>
    )
  }
);
