import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { Gallery } from '../../../shared/ui/gallery';
import { fetchManufacturers } from '../../../entities/manufacturer';
import { Currency } from '../../../entities/currency';
import { ChooseModel } from '../../../features/choose-model';
import { ChooseSpecification } from '../../../features/choose-specification';
import { ChooseDelivery } from '../../../features/choose-delivery';
import { Filter, FilterId } from '../../../features/filter';

import classes from './calculator.module.sass';
import useFilters from '../lib/hooks/use-filters';

export const Calculator = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [ activeFilters, setActiveFilters ] = useState< Partial<Record<FilterId, number[]>> >({});
  const [ currentManufacturer, setCurrentManufacturer ] = useState<number | null>(null);
  const [ currentModel, setCurrentModel ] = useState<number | null>(null);
  const [ currentSpecification, setCurrentSpecification ] = useState<number | null>(null);
  const [ promoMode, setPromoMode ] = useState(false);

  useFilters(activeFilters);

  useEffect(() => {
    setCurrentSpecification(null);
    dispatch(fetchManufacturers());
  }, []);

  const handleFiltersChange = useCallback(setActiveFilters, []);

  const handlePromo = (promoManufacturer: number, promoModel: number, promoSpecification: number) => {
    setPromoMode(true);
    setActiveFilters({});
    setCurrentManufacturer(promoManufacturer);
    setCurrentModel(promoModel);
    setCurrentSpecification(promoSpecification);
    setTimeout(() => setPromoMode(false), 1000);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        <Gallery
          handlePromo={currentModel ? null : handlePromo}
          galleryId={{
            specificationId: currentSpecification,
            modelId: currentModel,
          }}
        />
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
