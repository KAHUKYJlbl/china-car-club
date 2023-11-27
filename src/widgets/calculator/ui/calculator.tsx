import { useEffect } from 'react';

import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { fetchManufacturers } from '../../../entities/manufacturer';
import { Currency } from '../../../entities/currency';
import { ChooseModel } from '../../../features/choose-model';
import { ChooseSpecification } from '../../../features/choose-specification';

import classes from './calculator.module.sass';

export const Calculator = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchManufacturers());
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.model}>
        <ChooseModel />
      </div>

      <div className={classes.price}>
        <ChooseSpecification />
      </div>

      <div className={classes.currency}>
        <Currency />
      </div>

      <div className={classes.delivery}>
        Delivery
      </div>

      <div className={classes.filter}>
        Filter
      </div>

      <div className={classes.gallery}>
        Gallery
      </div>
    </div>
  )
}
