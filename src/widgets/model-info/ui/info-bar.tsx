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
            Сравнить все комплектации ↗
          </button>

          <button className={classes.button}>
            360° обзор ↗
          </button>

          <button className={classes.button}>
            История цены в Китае
          </button>

          <button className={classes.button}>
            Следить за снижением цены
          </button>
        </div>
      </div>
    )
  }
);
