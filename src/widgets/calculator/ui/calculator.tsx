import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { Gallery } from '../../../shared/ui/gallery';
import { fetchManufacturers } from '../../../entities/manufacturer';
import { Currency } from '../../../entities/currency';
import { ChooseModel } from '../../../features/choose-model';
import { ChooseSpecification } from '../../../features/choose-specification';
import { ChooseDelivery } from '../../../features/choose-delivery';
import { Filter } from '../../../features/filter';

import classes from './calculator.module.sass';

export const Calculator = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [ currentModel, setCurrentModel ] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchManufacturers());
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.gallery}>
        <Gallery />
      </div>

      <div className={classes.model}>
        <ChooseModel currentModel={currentModel} setCurrentModel={setCurrentModel} />
      </div>

      <div className={classes.filter}>
        <Filter />
      </div>

      <div className={classes.price}>
        <ChooseSpecification currentModel={currentModel} />
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
