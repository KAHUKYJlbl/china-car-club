import { memo, useEffect } from 'react';

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
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

import { FilterId } from '../../filter/lib/types';
import classes from './choose-model.module.sass';

type ChooseModelProps = {
  currentManufacturer: number | null;
  setCurrentManufacturer: React.Dispatch<React.SetStateAction<number | null>>;
  currentModel: number | null;
  setCurrentModel: React.Dispatch<React.SetStateAction<number | null>>;
  activeFilters: Partial< Record< FilterId, number[] > >;
}

export const ChooseModel = memo(
  ({
    currentManufacturer,
    setCurrentManufacturer,
    currentModel,
    setCurrentModel,
    activeFilters
  }: ChooseModelProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const carsCount = useAppSelector(getCarsCount);
    const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
    const specsLoadingStatus = useAppSelector(getSpecsLoadingStatus);
    const manufacturersList = useAppSelector(getManuacturersList);
    const modelsList = useAppSelector((state) => getModelsList(state, currentManufacturer));

    useEffect(() => {
      setCurrentModel(null);

      if (currentManufacturer) {
        dispatch(fetchManufacturersWithSpectsCount({
          manufacturerId: currentManufacturer,
          filters: activeFilters,
        }));
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
          <p>
            {carsCount.manufacturersCount} марок • {carsCount.seriesCount} моделей • {carsCount.specificationsCount} комплектаций
          </p>
        </div>

        <div className={classes.controls}>
          <Dropdown
            currentElement={currentManufacturer}
            setCurrent={setCurrentManufacturer}
            placeholder={'Марка'}
            list={manufacturersList}
          />

          <Dropdown
            currentElement={currentModel}
            setCurrent={setCurrentModel}
            placeholder={'Модель'}
            list={modelsList}
            disabled={specsLoadingStatus.isLoading}
          />
        </div>
      </div>
    );
  }
);
