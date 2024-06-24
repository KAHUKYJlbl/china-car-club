import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { AppRoute } from '../../../app/provider/router';
import { fetchManufacturers, getFullListCount, getManufacturersLoadingStatus } from '../../../entities/manufacturer';
import { CabinetButton } from '../../../shared/ui/header-button';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

import classes from './new-header.module.sass';

type NewHeaderProps = {};

export const NewHeader = ({}: NewHeaderProps) => {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ query: '(min-width: 961px)' });

  const carsCount = useAppSelector(getFullListCount);
  const manufacturersLoadingStatus = useAppSelector(getManufacturersLoadingStatus);

  useEffect(() => {
    if (manufacturersLoadingStatus.isIdle) {
      dispatch(fetchManufacturers());
    }
  }, [manufacturersLoadingStatus.isIdle]);

  return (
    <div className={classes.wrapper}>
        <div className={classes.logo}>
          <Link to={AppRoute.Main} >
            <svg
              width={ isDesktop ? 220 : 148 }
              height={ isDesktop ? 36 : 24 }
              aria-hidden="true"
            >
              <use xlinkHref="#logo" />
            </svg>
          </Link>

          {
            isDesktop &&
            <p className={classes.count}>
              {`${carsCount.manufacturersCount || 123} марок и ${carsCount.seriesCount || 1048} моделей под заказ из Китая`}
            </p>
          }
        </div>

        <div className={classes.cabinetButtons}>
          <CabinetButton icon='cabinet-mycars' />

          <CabinetButton icon='cabinet-favorite' />

          <CabinetButton icon='cabinet-profile' />
        </div>
    </div>
  );
};
