import { useEffect, useState } from 'react';
import cn from 'classnames';

import { Calculation, fetchMycars, getMycars, getMycarsLoadingStatus, Order } from '../../../entities/order';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

import classes from './mycars.module.sass';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import dayjs from 'dayjs';

const DISPLAYED_STEP = 4;

type MycarsProps = {};

export const Mycars = ({}: MycarsProps) => {
  const dispatch = useAppDispatch();

  const mycarsLoadingStatus = useAppSelector(getMycarsLoadingStatus);
  const mycars = useAppSelector(getMycars);

  const [ currentFolder, setCurrentFolder ] = useState<'orders' | 'favorites'>('orders');
  const [ currentSort, setCurrentSort ] = useState<'increase' | 'decrease'>('decrease');
  const [ currentDisplayed, setCurrentDisplayed ] = useState(8);

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

        <button
          className={cn(classes.button, classes.sortButton)}
          onClick={() => setCurrentSort((current) => current === 'increase' ? 'decrease' : 'increase')}
        >
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
            .toSorted((a, b) =>
              currentSort === 'increase'
              ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
              : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
            )
            .map((order) => (
              <li
                key={order.id}
              >
                <Order order={order} />
              </li>
            ))
            .concat(mycars.carCalculations
              .toSorted((a, b) =>
                currentSort === 'increase'
                ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
                : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
              )
              .map((calculation) => (
                <li
                  key={calculation.id}
                >
                  <Calculation calculation={calculation} />
                </li>
              ))
            )
            .slice(0, currentDisplayed)
        }
      </ul>

      {
        currentDisplayed < mycars.carOrders.length + mycars.carCalculations.length &&
        <button
          className={cn(classes.button, classes.displayButton)}
          onClick={() => setCurrentDisplayed((current) => current + DISPLAYED_STEP)}
        >
          Показать еще
        </button>
      }
    </div>
  );
};
