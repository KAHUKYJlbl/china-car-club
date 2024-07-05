import { useEffect } from "react";
import dayjs from "dayjs";

import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { fetchCurrency, getCurrency, getCurrencyLoadingStatus } from "../../../entities/currency";
import { Calculation, getCalculations, getCalculationsLoadingStatus } from "../../../entities/order";
import { fetchCalculations } from "../../../entities/order";

import classes from './calculations.module.sass';

type CalculationsProps = {
  currentSort: 'increase' | 'decrease';
};

export const Calculations = ({ currentSort }: CalculationsProps) => {
  const dispatch = useAppDispatch();

  const calculations = useAppSelector(getCalculations);
  const calculationsLoadingStatus = useAppSelector(getCalculationsLoadingStatus);
  const currency = useAppSelector(getCurrency);
  const currencyLoadingStatus = useAppSelector(getCurrencyLoadingStatus);

  useEffect(() => {
    dispatch(fetchCalculations());
  }, []);

  useEffect(() => {
    if (currencyLoadingStatus.isIdle) {
      dispatch(fetchCurrency());
    }
  }, []);

  if (
    !currency
    || calculationsLoadingStatus.isIdle
    || calculationsLoadingStatus.isLoading
  ) {
    return <LoadingSpinner spinnerType='page' />
  }

  return (
    <>
      <ul className={classes.list}>
        {
          calculations
            .toSorted((a, b) =>
              currentSort === 'increase'
              ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
              : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
            )
            .map((calculation) => (
              <Calculation currency={currency} calculation={calculation} key={calculation.id} />
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
