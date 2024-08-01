import { memo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../../app/provider/router';

import { Calculations } from './calculations';
import { Orders } from './orders';
import { Favorites } from './favorites';
import classes from './mycars.module.sass';

type MycarsProps = {
  folder: 'orders' | 'favorites' | 'calculations';
};

export const Mycars = memo(
  ({ folder }: MycarsProps) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({ query: '(min-width: 721px)' });

    const [ currentSort, setCurrentSort ] = useState<'increase' | 'decrease'>('decrease');

    return (
      <div className={classes.wrapper}>
        <div className={classes.bar}>
          <div className={classes.buttonWrapper}>
            <button
              aria-label='заявки'
              className={cn(
                classes.button,
                {[classes.buttonActive]: folder === 'orders'},
              )}
              onClick={() => navigate( [AppRoute.MyCars, AppRoute.MyCarsOrders].join('') )}
            >
              Заявки
            </button>

            <button
              aria-label='расчеты'
              className={cn(
                classes.button,
                {[classes.buttonActive]: folder === 'calculations'},
              )}
              onClick={() => navigate( [AppRoute.MyCars, AppRoute.MyCarsCalculations].join('') )}
            >
              Расчеты
            </button>

            <button
              aria-label='избранное'
              className={cn(
                classes.button,
                {[classes.buttonActive]: folder === 'favorites'}
              )}
              onClick={() => navigate( [AppRoute.MyCars, AppRoute.MyCarsFavorites].join('') )}
            >
              Избранное
            </button>
          </div>

          <button
            aria-label='сортировка'
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
          folder === 'orders' &&
          <Orders currentSort={currentSort} />
        }

        {
          folder === 'calculations' &&
          <Calculations currentSort={currentSort} />
        }

        {
          folder === 'favorites' &&
          <Favorites currentSort={currentSort} />
        }
      </div>
    );
  }
);
