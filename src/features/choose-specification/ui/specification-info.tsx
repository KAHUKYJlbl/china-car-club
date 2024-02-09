import { memo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';
import {
  getSpecifications,
  getSpecificationsLoadingStatus
} from '../../../entities/specification';
import { getManufacturersLoadingStatus, getName } from '../../../entities/manufacturer';
import { Dropdown } from '../../../shared/ui/dropdown';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

import classes from './specification-info.module.sass';

type SpecificationInfoProps = {
  isPrices: boolean;
  setIsPrices: React.Dispatch<React.SetStateAction<boolean>>;
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
};

export const SpecificationInfo = memo(
  ({ currentSpecification, setCurrentSpecification, setIsPrices, isPrices }: SpecificationInfoProps): JSX.Element => {
    const [ searchParams, _setSearchParams ] = useSearchParams();
    const specifications = useAppSelector(getSpecifications);
    const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
    const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus)
    const name = useAppSelector((state) => getName(state, Number( searchParams.get('model') )));

    if (manufacturersLoadingStatus.isLoading || manufacturersLoadingStatus.isIdle) {
      return <LoadingSpinner spinnerType='widget' />
    }

    if (!name || !specifications.find((spec) => spec.id === currentSpecification)) {
      return <Navigate to={AppRoute.NotFound} />
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <h2 className={classes.header}>
            {name.manufacturer}<br/>{name.model}
          </h2>

          <button onClick={() => setIsPrices((current) => !current)}>
            {isPrices ? 'О машине' : 'К ценам'}
          </button>
        </div>

        <div className={classes.bottom}>
          <p className={classes.label}>
            Комплектация нового автомобиля
          </p>

          <Dropdown
            currentElement={currentSpecification}
            setCurrent={setCurrentSpecification}
            placeholder='Комплектация'
            list={specifications}
            disabled={specificationsLoadingStatus.isLoading}
          />
        </div>
      </div>
    )
  }
);
