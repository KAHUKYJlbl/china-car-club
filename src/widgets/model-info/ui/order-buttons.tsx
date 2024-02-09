import { memo } from 'react';

import classes from './order-buttons.module.sass';

export const OrderButtons = memo(
  (): JSX.Element => {
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainButtons}>
          <button className={classes.round}>
            Уменьшить цену
          </button>

          <button>
            Оставить заявку
          </button>
        </div>

        <button>
          Выбрать другой автомобиль или страну
        </button>
      </div>
    )
  }
);
