import { memo } from 'react';

import classes from './order-buttons.module.sass';

export const OrderButtons = memo(
  (): JSX.Element => {
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainButtons}>
          <button>
            Хочу спеццену дешевле
          </button>
        </div>

        <p className={classes.info}>
          Пришлём цену ниже или запросим цены у наших партнёров. Выберите лучшее предложение
        </p>
    </div>
    )
  }
);
