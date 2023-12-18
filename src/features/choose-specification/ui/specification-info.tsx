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

export const SpecificationInfo = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { modelId } = useParams();
  const specifications = useAppSelector(getSpecifications);
  const specificationsLoadingStatus = useAppSelector(getSpecificationsLoadingStatus);
  const [ currentSpecification, setCurrentSpecification ] = useState<number | null>(null);

  useEffect(() => {
    setCurrentSpecification(null);

    if (modelId) {
      dispatch(fetchSpecifications({
        modelId: +modelId,
        filters: {},
      }));
    }
  }, [modelId]);

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
