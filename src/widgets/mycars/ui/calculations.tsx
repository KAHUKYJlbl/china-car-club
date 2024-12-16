import { memo, useEffect } from "react";
import dayjs from "dayjs";

import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { getCurrency } from "../../../entities/currency";
import { getCurrentSiteMode, SiteModes } from "../../../entities/settings";
import {
  Calculation,
  getCalculations,
  getCalculationsLoadingStatus,
  getPagination,
  resetMycars,
  fetchCalculations,
  UsedCalculation,
} from "../../../entities/user";

import classes from "./calculations.module.sass";

type CalculationsProps = {
  currentSort: "increase" | "decrease";
};

export const Calculations = memo(({ currentSort }: CalculationsProps) => {
  const dispatch = useAppDispatch();

  const calculations = useAppSelector(getCalculations);
  const calculationsLoadingStatus = useAppSelector(getCalculationsLoadingStatus);
  const currency = useAppSelector(getCurrency);
  const pagination = useAppSelector(getPagination);
  const mode = useAppSelector(getCurrentSiteMode);

  useEffect(() => {
    if (!calculationsLoadingStatus.isLoading) {
      dispatch(resetMycars());
      dispatch(fetchCalculations({ mode }));
    }
  }, []);

  if (!currency || calculationsLoadingStatus.isIdle || calculationsLoadingStatus.isLoading || !calculations.length) {
    return <LoadingSpinner spinnerType="page" />;
  }

  if (calculations.length === 0) {
    return <p className={classes.empty}>У Вас пока нет рассчитанных автомобилей</p>;
  }

  return (
    <>
      <ul className={classes.list}>
        {[...calculations]
          .sort((a, b) =>
            currentSort === "increase"
              ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
              : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
          )
          .map((calculation) =>
            mode === SiteModes.New ? (
              <Calculation
                currency={currency}
                calculation={calculation}
                key={calculation.id}
              />
            ) : (
              <UsedCalculation
                currency={currency}
                calculation={calculation}
                key={calculation.id}
              />
            ),
          )}
      </ul>

      {pagination.currentPage < pagination.lastPage && (
        <button
          aria-label="показать еще"
          className={classes.button}
          onClick={() => dispatch(fetchCalculations({ page: pagination.currentPage + 1, mode }))}
        >
          {calculationsLoadingStatus.isLoading ? <LoadingSpinner spinnerType="button" /> : "Показать еще"}
        </button>
      )}
    </>
  );
});
