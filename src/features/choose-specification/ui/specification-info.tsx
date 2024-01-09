import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  fetchSpecifications,
  getSpecifications,
  getSpecificationsLoadingStatus
} from '../../../entities/specification';
import { Dropdown } from '../../../shared/ui/dropdown';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
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
    const specifications = useAppSelector(getSpecifications);
    const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);

  return (
    <div className={classes.wrapper}>
      <div className={classes.top}>
        <h2 className={classes.header}>
          LiXang L9
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
          current={currentSpecification}
          setCurrent={setCurrentSpecification}
          placeholder='Комплектация'
          list={specifications}
          disabled={specificationsLoadingStatus.isLoading}
        />
      </div>
    </div>
  )
}
