import { memo } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";

import { AppRoute } from "../../../app/provider/router";
import { getSpecifications, getSpecificationsLoadingStatus } from "../../../entities/specification";
import { getManufacturersLoadingStatus, getName } from "../../../entities/manufacturer";
import { DropdownBlocks } from "../../../shared/ui/dropdown";
import { LoadingSpinner } from "../../../shared/ui/loading-spinner";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";

import classes from "./specification-info.module.sass";

type SpecificationInfoProps = {
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
};

export const SpecificationInfo = memo(
  ({ currentSpecification, setCurrentSpecification }: SpecificationInfoProps): JSX.Element => {
    const [searchParams, _setSearchParams] = useSearchParams();
    const specifications = useAppSelector(getSpecifications);
    const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
    const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
    const name = useAppSelector((state) => getName(state, Number(searchParams.get("model"))));

    if (manufacturersLoadingStatus.isLoading || manufacturersLoadingStatus.isIdle) {
      return <LoadingSpinner spinnerType="widget" />;
    }

    if (!name || !specifications.find((spec) => spec.id === currentSpecification)) {
      return <Navigate to={AppRoute.NotFound} />;
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <h2 className={classes.header}>
            {name.manufacturer}
            <br />
            {name.model}
          </h2>

          <Link
            aria-label="вернуться назад"
            to={AppRoute.Main}
          >
            Назад
          </Link>
        </div>

        <div className={classes.bottom}>
          <p className={classes.label}>Комплектация автомобиля:</p>

          <div className={classes.dropdownWrapper}>
            <DropdownBlocks
              currentElement={currentSpecification}
              setCurrent={setCurrentSpecification}
              placeholder="Комплектация"
              list={specifications}
              disabled={specificationsLoadingStatus.isLoading}
              isPrices
              isYear
            />
          </div>
        </div>
      </div>
    );
  }
);
