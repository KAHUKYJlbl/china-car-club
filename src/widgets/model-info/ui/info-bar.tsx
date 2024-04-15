import { memo } from 'react';

import classes from './info-bar.module.sass';

export const InfoBar = memo(
  (): JSX.Element => {
    return (
      <div className={classes.wrapper}>
        <div className={classes.specs}>
          Внедорожник • Элктрический двигатель • Автоматическая коробка • Полный привод • Запас хода 600+ км
        </div>

        <div className={classes.row}>
          <button className={classes.button}>
            История цены
          </button>

          <button className={classes.button}>
            Следить за скидками
          </button>
        </div>
      </div>
    )
  }
);
