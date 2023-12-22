import { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
  currentModel: number | null;
  activeFilters: Partial< Record< FilterId, number[] > >;
  setCurrentModel: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ChooseModel = memo(
  ({currentModel, setCurrentModel, activeFilters}: ChooseModelProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [ currentManufacturer, setCurrentManufacturer ] = useState<number | null>(null);

    const carsCount = useAppSelector(getCarsCount);
    const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);
    const specsLoadingStatus = useAppSelector(getSpecsLoadingStatus);
    const manufacturersList = useAppSelector(getManuacturersList);
    const modelsList = useAppSelector((state) => getModelsList(state, currentManufacturer));

    useEffect(() => {
      setCurrentModel(null);

      if (currentManufacturer) {
        handleManufacturerChange(currentManufacturer);
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

    const handleManufacturerChange = (id: number) => {
      setSearchParams({
        manufacturer: id.toString(),
      });
    }

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
