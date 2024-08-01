import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../../entities/user/model/user-slice';
import { AppRoute } from '../../../app/provider/router';
import { clearToken } from '../../../shared/api/token';
import { CabinetButton } from '../../../shared/ui/header-button';
import { useAppSelector } from '../../../shared/lib/hooks/use-app-selector';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';

import { getFavoritesCount, getFavoritesLoadingStatus } from '../model/user-selectors';
import { fetchFavorites } from '../model/api-actions/fetch-favorites';
import classes from './new-header-user.module.sass';

type NewHeaderUserProps = {};

export const NewHeaderUser = ({}: NewHeaderUserProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoritesCount = useAppSelector(getFavoritesCount);
  const favoritesLoadingStatus = useAppSelector(getFavoritesLoadingStatus);

  useEffect(() => {
    if (favoritesLoadingStatus.isIdle) {
      dispatch(fetchFavorites());
    }
  }, []);


  return (
    <div className={classes.wrapper}>
      <CabinetButton
        label='мои автомобили'
        icon='cabinet-mycars'
        callback={() => navigate( [AppRoute.MyCars, AppRoute.MyCarsOrders].join('') )}
      />

      <CabinetButton
        label='избранное'
        icon='cabinet-favorite'
        labelCount={favoritesCount}
        callback={() => navigate( [AppRoute.MyCars, AppRoute.MyCarsFavorites].join('') )}
      />

      <CabinetButton
        label='выход'
        icon='cabinet-profile'
        callback={() => {
          clearToken();
          dispatch(logout());
        }}
      />
    </div>
  );
};
