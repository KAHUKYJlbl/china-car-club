import { useEffect, useState } from 'react';

import {
  fetchManufacturersWithSpectsCount,
  getCarsCount,
  getManuacturersList,
  getManufacturersLoadingStatus,
  getModelsList,
  getSpecsLoadingStatus,
} from '../../../entities/manufacturer';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector'
import { Dropdown } from '../../../shared/ui/dropdown';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import classes from './choose-model.module.sass';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

export const ChooseModel = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [ currentManufacturer, setCurrentManufacturer ] = useState<number | null>(null);
  const [ currentModel, setCurrentModel ] = useState<number | null>(null);

  const carsCount = useAppSelector(getCarsCount);
  const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
  const specsLoadingStatus = useAppSelector(getSpecsLoadingStatus);
  const manufacturersList = useAppSelector(getManuacturersList);
  const modelsList = useAppSelector((state) => getModelsList(state, currentManufacturer));

  useEffect(() => {
    setCurrentModel(null);

    if (currentManufacturer) {
      dispatch(fetchManufacturersWithSpectsCount(currentManufacturer));
    }
  }, [currentManufacturer]);

  useEffect(() => {
    setCurrentManufacturer(null);
    setCurrentModel(null);
  }, [carsCount.manufacturersCount, carsCount.seriesCount, carsCount.manufacturersCount]);

  if (manufacturersLoadingStatus.isLoading || !manufacturersList) {
    return <LoadingSpinner spinnerType='widget' />
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.count}>
        {carsCount.manufacturersCount} марок • {carsCount.seriesCount} моделей • {carsCount.specificationsCount} комплектаций
      </div>

      <div className={classes.controls}>
        <Dropdown
          current={currentManufacturer}
          setCurrent={setCurrentManufacturer}
          placeholder={'Марка'}
          list={manufacturersList}
        />

        <Dropdown
          current={currentModel}
          setCurrent={setCurrentModel}
          placeholder={'Модель'}
          list={modelsList}
          disabled={specsLoadingStatus.isLoading}
        />
      </div>
    </div>
  )
}
