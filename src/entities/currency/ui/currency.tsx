import { memo } from 'react';

import classes from './currency.module.sass';

export const Currency = memo(
  (): JSX.Element => {
    return (
      <div className={classes.wrapper}>
        <p>CNY = 00.00₽⠀•⠀USD = 00.00₽</p>

        <p>00 мес 00</p>
      </div>
    )
  }
);
