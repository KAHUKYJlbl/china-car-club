import { useEffect, useState } from 'react';

import {
  getCarsCount,
  getManuacturersList,
  getManufacturersLoadingStatus,
  getModelsList
} from '../../../entities/manufacturer';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector'
import { Dropdown } from '../../../shared/ui/dropdown';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';

import classes from './choose-model.module.sass';

export const ChooseModel = (): JSX.Element => {
  const [ currentManufacturer, setCurrentManufacturer ] = useState<number | null>(null);
  const [ currentModel, setCurrentModel ] = useState<number | null>(null);

  const carsCount = useAppSelector(getCarsCount);
  const loadingStatus = useAppSelector(getManufacturersLoadingStatus);
  const manufacturersList = useAppSelector(getManuacturersList);
  const modelsList = useAppSelector((state) => getModelsList(state, currentManufacturer));

  useEffect(() => {setCurrentModel(null)}, [currentManufacturer]);

  useEffect(() => {
    setCurrentManufacturer(null);
    setCurrentModel(null);
  }, [carsCount.manufacturersCount, carsCount.seriesCount, carsCount.manufacturersCount]);

  if (loadingStatus.isLoading || !manufacturersList) {
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
        />
      </div>
    </div>
  )
}
