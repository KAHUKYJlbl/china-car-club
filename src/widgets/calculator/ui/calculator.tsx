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

export const Calculator = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [ activeFilters, setActiveFilters ] = useState< Partial<Record<FilterId, number[]>> >({});
  const [ currentManufacturer, setCurrentManufacturer ] = useState<number | null>(null);
  const [ currentModel, setCurrentModel ] = useState<number | null>(null);
  const [ currentSpecification, setCurrentSpecification ] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchManufacturers());
  }, []);

const handleFiltersChange = useCallback(
  setActiveFilters,
  []
);

  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        <Gallery
          isPromo={!currentModel}
          specificationId={currentSpecification}
        />
      </div>

      <div className={classes.model}>
        <ChooseModel
          currentManufacturer={currentManufacturer}
          setCurrentManufacturer={setCurrentManufacturer}
          currentModel={currentModel}
          setCurrentModel={setCurrentModel}
          setCurrentSpecification={setCurrentSpecification}
          activeFilters={activeFilters}
        />
      </div>

      <div className={classes.filter}>
        <Filter activeFilters={activeFilters} setActiveFilters={handleFiltersChange} />
      </div>

      <div className={classes.price}>
        <ChooseSpecification
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
        <ChooseDelivery />
      </div>
    </div>
  )
}
