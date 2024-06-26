import { useEffect, useState } from 'react';
import cn from 'classnames';

import { Calculation, fetchMycars, getMycars, getMycarsLoadingStatus, Order } from '../../../entities/order';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

import classes from './mycars.module.sass';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

type MycarsProps = {};

export const Mycars = ({}: MycarsProps) => {
  const dispatch = useAppDispatch();

  const mycarsLoadingStatus = useAppSelector(getMycarsLoadingStatus);
  const mycars = useAppSelector(getMycars);

  const [ currentFolder, setCurrentFolder ] = useState<'orders' | 'favorites'>('orders');

  useEffect(() => {
    dispatch(fetchMycars());
  }, []);

  if (mycarsLoadingStatus.isIdle || mycarsLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='page' />
  }

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
        {
          mycars.carOrders
            .map((order) => (
              <li>
                <Order order={order} />
              </li>
            ))
            .concat(mycars.carCalculations.map((calculation) => (
              <li>
                <Calculation calculation={calculation} />
              </li>
            )))
        }
      </ul>
    </div>
  );
};
