import { memo } from 'react';

import {
  getSpecifications,
  getSpecificationsLoadingStatus
} from '../../../entities/specification';
import { Dropdown } from '../../../shared/ui/dropdown';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';

import classes from './specification-info.module.sass';

type SpecificationInfoProps = {
  currentSpecification: number | null;
  setCurrentSpecification: React.Dispatch<React.SetStateAction<number | null>>;
};

export const SpecificationInfo = memo(
  ({ currentSpecification, setCurrentSpecification }: SpecificationInfoProps): JSX.Element => {
    const specifications = useAppSelector(getSpecifications);
    const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);

    return (
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <h2 className={classes.header}>
            LiXang L9
          </h2>

          <button>
            О машине
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
