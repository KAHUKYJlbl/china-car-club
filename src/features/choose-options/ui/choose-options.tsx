import { useState } from 'react';
import cn from 'classnames';

import { Dropdown } from '../../../shared/ui/dropdown';

import classes from './choose-options.module.sass';

enum Currency {
  RUB = '₽',
  USD = '$',
  CNY = '¥',
};

export const ChooseOptions = (): JSX.Element => {
  const [ currentCurrency, setCurrentCurrency ] = useState(Currency.RUB);
  const [ currentDelivery, setCurrentDelivery ] = useState<number | null>(null);

  return (
    <div className={classes.wrapper}>
      <Dropdown
        current={currentDelivery}
        setCurrent={setCurrentDelivery}
        list={[{name: 'Москва и города ЦФО', id: 0}]}
        placeholder='Выберите регион доставки'
      />

      <div className={classes.block}>
        <div className={classes.prices}>
          <span className={classes.price}>
            0 000 000 {currentCurrency}
          </span>

          Цена на авто под ключ

          <span className={classes.price}>
            0 000 000 {currentCurrency}
          </span>

          Цена со снижением

          <div className={classes.buttons}>
            <button
              className={cn({[classes.current]: currentCurrency === Currency.RUB})}
              onClick={() => setCurrentCurrency(Currency.RUB)}
            >
              {Currency.RUB}
            </button>

            <button
              className={cn({[classes.current]: currentCurrency === Currency.USD})}
              onClick={() => setCurrentCurrency(Currency.USD)}
            >
              {Currency.USD}
            </button>

            <button
              className={cn({[classes.current]: currentCurrency === Currency.CNY})}
              onClick={() => setCurrentCurrency(Currency.CNY)}
            >
              {Currency.CNY}
            </button>
          </div>
        </div>

        <div className={classes.options}>
          <div className={classes.optionsItem}>
            Выбрать доп.опции
          </div>

          <div className={classes.optionsItem}>
            ЭПТС и утильсбор
          </div>

          <div className={classes.optionsItem}>
            Гарантия на авто
          </div>
        </div>
      </div>
    </div>
  )
}
