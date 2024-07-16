import { useEffect } from "react";
import dayjs from "dayjs";

import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { fetchCurrency, getCurrency, getCurrencyLoadingStatus } from "../../../entities/currency";
import { Calculation, getCalculations, getCalculationsLoadingStatus, getPagination, resetMycars, fetchCalculations } from "../../../entities/user";

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
  const pagination = useAppSelector(getPagination);

  useEffect(() => {
    dispatch(resetMycars());
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
    || ( calculationsLoadingStatus.isLoading && !calculations.length )
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
              <Calculation
                currency={currency}
                calculation={calculation}
                key={calculation.id}
              />
            ))
        }
      </ul>

      {
        pagination.currentPage < pagination.lastPage &&
        <button
          className={classes.button}
          onClick={() => dispatch(fetchCalculations( pagination.currentPage + 1 ))}
        >
          {
            calculationsLoadingStatus.isLoading
            ? <LoadingSpinner spinnerType="button" />
            : 'Показать еще'
          }
        </button>
      }
    </>
  );
};
