import { useEffect, useState } from "react";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { HeaderButton } from "../../../shared/ui/header-button/header-button";

import { useGeolocation } from "../lib/hooks/use-geolocation";
import { fetchCity } from "../model/api-actons/fetch-city";
import { fetchHash } from "../model/api-actons/fetch-hash";
import {
  getAuthStatus,
  getGeolocationMode
} from "../model/user-selectors";
import { logout, setGeolocation } from "../model/user-slice";
import { Login } from "./login";
import classes from './header-user.module.sass';

type headerUserProps = {};

export const HeaderUser = ({}: headerUserProps) => {
  const dispatch = useAppDispatch();
  const location = useGeolocation();
  const locationMode = useAppSelector(getGeolocationMode);
  const isAuth = useAppSelector(getAuthStatus);
  const [ isLogin, setIsLogin ] = useState(false);

  useEffect(() => {
    dispatch(setGeolocation(location));
    if (location.latitude && location.longitude) {
      dispatch(fetchCity(location));
    }
  }, [location.latitude, location.longitude, locationMode]);

  const handleLoginClick = () => {
    if (isAuth) {
      dispatch(logout());
    } else {
      dispatch(fetchHash());
      setIsLogin(true);
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <HeaderButton icon='favorite' text='Избранное' type='light' onClick={() => null} />

        <HeaderButton icon='profile' text={isAuth ? 'Выйти' : 'Войти'} type='light' onClick={handleLoginClick} />
      </div>

      {
        isLogin &&
        <Login
          onClose={() => setIsLogin(false)}
          onLogin={() => null}
        />
      }
    </>
  );
};
