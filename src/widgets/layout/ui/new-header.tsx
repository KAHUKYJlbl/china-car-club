import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import plural from 'plural-ru';

import { AppRoute } from '../../../app/provider/router';
import { fetchManufacturers, getFullListCount, getManufacturersLoadingStatus } from '../../../entities/manufacturer';
import { logout } from '../../../entities/user/model/user-slice';
import { clearToken } from '../../../shared/api/token';
import { CabinetButton } from '../../../shared/ui/header-button';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

import classes from './new-header.module.sass';

type NewHeaderProps = {};

export const NewHeader = ({}: NewHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
              {
                plural(carsCount.manufacturersCount, '%d марка', '%d марки', '%d марок')
              }&#32;и {
                plural(carsCount.seriesCount, '%d модель', '%d модели', '%d моделей')
              }&#32;под заказ из Китая
            </p>
          }
        </div>

        <div className={classes.cabinetButtons}>
          <CabinetButton icon='cabinet-mycars' callback={() => navigate( [AppRoute.MyCars, AppRoute.MyCarsOrders].join('') )} />

          <CabinetButton icon='cabinet-favorite' callback={() => navigate( [AppRoute.MyCars, AppRoute.MyCarsFavorites].join('') )} />

          <CabinetButton
            icon='cabinet-profile'
            callback={() => {
              clearToken();
              dispatch(logout());
            }}
          />
        </div>
    </div>
  );
};
