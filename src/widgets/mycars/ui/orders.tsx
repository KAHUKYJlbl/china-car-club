import { useEffect } from 'react';
import dayjs from 'dayjs';

import { fetchOrders, getOrders, getOrdersLoadingStatus, Order } from '../../../entities/order';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import classes from './orders.module.sass';

type OrdersProps = {
  currentSort: 'increase' | 'decrease';
};

export const Orders = ({ currentSort }: OrdersProps) => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(getOrders);
  const ordersLoadingStatus = useAppSelector(getOrdersLoadingStatus);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (ordersLoadingStatus.isIdle || ordersLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='page' />
  }

  return (
    <>
      <ul className={classes.list}>
        {
          orders
            .toSorted((a, b) =>
              currentSort === 'increase'
              ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
              : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
            )
            .map((order) => (
              <Order order={order} key={order.id} />
            ))
        }
      </ul>

      {/* {
        currentDisplayed < mycars.carOrders.length + mycars.carCalculations.length &&
        <button
          className={cn(classes.button, classes.displayButton)}
          onClick={() => setCurrentDisplayed((current) => current + DISPLAYED_STEP)}
        >
          Показать еще
        </button>
      } */}
    </>
  );
};
