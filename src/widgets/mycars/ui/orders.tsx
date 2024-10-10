import { memo, useEffect } from "react";
import dayjs from "dayjs";

import {
  fetchOrders,
  getOrders,
  getOrdersLoadingStatus,
  Order,
  getPagination,
  resetMycars,
  UsedOrder,
} from "../../../entities/user";
import { getCurrentSiteMode, SiteModes } from "../../../entities/settings";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";

import classes from "./orders.module.sass";

type OrdersProps = {
  currentSort: "increase" | "decrease";
};

export const Orders = memo(({ currentSort }: OrdersProps) => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(getOrders);
  const ordersLoadingStatus = useAppSelector(getOrdersLoadingStatus);
  const pagination = useAppSelector(getPagination);
  const mode = useAppSelector(getCurrentSiteMode);

  useEffect(() => {
    if (!ordersLoadingStatus.isLoading) {
      dispatch(resetMycars());
      dispatch(fetchOrders({ mode }));
    }
  }, []);

  if (ordersLoadingStatus.isIdle || (ordersLoadingStatus.isLoading && !orders.length)) {
    return <LoadingSpinner spinnerType="page" />;
  }

  if (orders.length === 0) {
    return <p className={classes.empty}>У Вас пока нет заказанных автомобилей</p>;
  }

  return (
    <>
      <ul className={classes.list}>
        {orders
          .toSorted((a, b) =>
            currentSort === "increase"
              ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
              : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
          )
          .map((order) =>
            mode === SiteModes.New ? (
              <Order
                order={order}
                key={order.id}
              />
            ) : (
              <UsedOrder
                order={order}
                key={order.id}
              />
            )
          )}
      </ul>

      {pagination.currentPage < pagination.lastPage && (
        <button
          aria-label="показать еще"
          className={classes.button}
          onClick={() => dispatch(fetchOrders({ page: pagination.currentPage + 1, mode }))}
        >
          {ordersLoadingStatus.isLoading ? <LoadingSpinner spinnerType="button" /> : "Показать еще"}
        </button>
      )}
    </>
  );
});
