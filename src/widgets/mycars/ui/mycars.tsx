import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import cn from 'classnames';

import { Calculations } from './calculations';
import { Orders } from './orders';
import classes from './mycars.module.sass';

type MycarsProps = {};

export const Mycars = ({}: MycarsProps) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 961px)' });

  const [ currentFolder, setCurrentFolder ] = useState<'orders' | 'favorites' | 'calculations'>('orders');
  const [ currentSort, setCurrentSort ] = useState<'increase' | 'decrease'>('decrease');

  return (
    <div className={classes.wrapper}>
      <div className={classes.bar}>
        <div className={classes.buttonWrapper}>
          <button
            className={cn(
              classes.button,
              {[classes.buttonActive]: currentFolder === 'orders'},
            )}
            onClick={() => {setCurrentFolder('orders')}}
          >
            Заявки
          </button>

          <button
            className={cn(
              classes.button,
              {[classes.buttonActive]: currentFolder === 'calculations'},
            )}
            onClick={() => {setCurrentFolder('calculations')}}
          >
            Расчеты
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

        <button
          className={cn(classes.button, classes.sortButton)}
          onClick={() => setCurrentSort((current) => current === 'increase' ? 'decrease' : 'increase')}
        >
          <svg
            width={12}
            height={14}
            aria-hidden="true"
          >
            <use xlinkHref="#sort" />
          </svg>

          {
            isDesktop &&
            <span>Сортировка</span>
          }
        </button>
      </div>

      {
        currentFolder === 'orders'
        ? <Orders currentSort={currentSort} />
        : currentFolder === 'calculations'
          ? <Calculations currentSort={currentSort} />
          : <div>Favorites</div>
      }
    </div>
  );
};
