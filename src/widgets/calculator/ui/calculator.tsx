import { useCallback, useEffect, useState } from 'react';

import { Gallery } from '../../../shared/ui/gallery';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { fetchSpecificationsImage, getDefaultImages, getSpecificationImgLoadingStatus } from '../../../entities/specification';
import { Currency, fetchCurrency } from '../../../entities/currency';
import { fetchManufacturers } from '../../../entities/manufacturer';
import { setIdle } from '../../../entities/model';
import { ChooseModel } from '../../../features/choose-model';
import { ChooseDelivery } from '../../../features/choose-delivery';
import { Filter, FilterId } from '../../../features/filter';
import { ChooseSpecification } from '../../../features/choose-specification';

import classes from './calculator.module.sass';
import useFilters from '../lib/hooks/use-filters';

export const Calculator = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const specificationImgLoadingStatus = useAppSelector(getSpecificationImgLoadingStatus);

  const [ activeFilters, setActiveFilters ] = useState< Partial<Record<FilterId, number[]>> >({});
  const [ currentManufacturer, setCurrentManufacturer ] = useState<number | null>(null);
  const [ currentModel, setCurrentModel ] = useState<number | null>(null);
  const [ currentSpecification, setCurrentSpecification ] = useState<number | null>(null);
  const [ promoMode, setPromoMode ] = useState(false);

  const imgList = useAppSelector(getDefaultImages);

  useFilters(activeFilters);

  useEffect(() => {
    setCurrentSpecification(null);
    dispatch(fetchManufacturers());
    dispatch(setIdle());
    dispatch(fetchCurrency());
  }, []);

  useEffect(() => {
    if (currentSpecification) {
      dispatch( fetchSpecificationsImage(currentSpecification) );
    }
  }, [currentSpecification]);

  const handleFiltersChange = useCallback(setActiveFilters, []);

  const handlePromo = (promoManufacturer: number, promoModel: number, promoSpecification: number) => {
    setPromoMode(true);
    setActiveFilters({});
    setCurrentManufacturer(promoManufacturer);
    setCurrentModel(promoModel);
    setCurrentSpecification(promoSpecification);
    setTimeout(() => setPromoMode(false), 2000);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        {
          specificationImgLoadingStatus.isLoading
          ? <LoadingSpinner spinnerType='widget' />
          : <Gallery
            handlePromo={currentSpecification ? null : handlePromo}
            galleryList={imgList}
            specificationId={currentSpecification}
            modelId={currentModel}
          />
        }
      </div>

      <div className={classes.filter}>
        <Filter activeFilters={activeFilters} setActiveFilters={handleFiltersChange} />
      </div>

      <div className={classes.model}>
        <ChooseModel
          isPromo={promoMode}
          currentManufacturer={currentManufacturer}
          setCurrentManufacturer={setCurrentManufacturer}
          currentModel={currentModel}
          setCurrentModel={setCurrentModel}
          setCurrentSpecification={setCurrentSpecification}
          activeFilters={activeFilters}
        />
      </div>

      <div className={classes.price}>
        <ChooseSpecification
          isPromo={promoMode}
          currentManufacturer={currentManufacturer}
          currentModel={currentModel}
          currentSpecification={currentSpecification}
          setCurrentSpecification={setCurrentSpecification}
          activeFilters={activeFilters}
        />
      </div>

      <div className={classes.currency}>
        <Currency />
      </div>

      <div className={classes.delivery}>
        <ChooseDelivery modelId={currentModel} specificationId={currentSpecification} />
      </div>
    </div>
  )
}
