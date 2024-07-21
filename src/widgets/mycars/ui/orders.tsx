import { useEffect } from 'react';
import dayjs from 'dayjs';

import {
  fetchOrders,
  getOrders,
  getOrdersLoadingStatus,
  Order,
  getPagination,
  resetMycars
} from '../../../entities/user';
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
  const pagination = useAppSelector(getPagination);

  useEffect(() => {
    dispatch(resetMycars());
    dispatch(fetchOrders());
  }, []);

  if (
    ordersLoadingStatus.isIdle
    || ( ordersLoadingStatus.isLoading && !orders.length )
  ) {
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

      {
        pagination.currentPage < pagination.lastPage &&
        <button
          className={classes.button}
          onClick={() => dispatch(fetchOrders( pagination.currentPage + 1 ))}
        >
          {
            ordersLoadingStatus.isLoading
            ? <LoadingSpinner spinnerType='button' />
            : 'Показать еще'
          }
        </button>
      }
    </>
  );
};
