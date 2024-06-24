import { useState } from 'react';
import cn from 'classnames';

import classes from './mycars.module.sass';

type MycarsProps = {};

export const Mycars = ({}: MycarsProps) => {
  const [ currentFolder, setCurrentFolder ] = useState<'orders' | 'favorites'>('orders');
  return (
    <div className={classes.wrapper}>
      <div className={classes.bar}>
        <div className={classes.buttonWrapper}>
          <button
            className={cn(
              classes.button,
              {[classes.buttonActive]: currentFolder === 'orders'},
            )}
            onClick={() => setCurrentFolder('orders')}
          >
            Заявки и расчеты
          </button>

          <button
            className={cn(
              classes.button,
              {[classes.buttonActive]: currentFolder === 'favorites'}
            )}
            onClick={() => null}
          >
            Избранное
          </button>
        </div>

        <button className={cn(classes.button, classes.sortButton)}>
          <svg
            width={14}
            height={12}
            aria-hidden="true"
          >
            <use xlinkHref="#sort" />
          </svg>

          <span>Сортировка</span>
        </button>
      </div>

      <ul className={classes.list}>

      </ul>
    </div>
  );
};
