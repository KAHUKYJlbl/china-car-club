import { memo, useEffect, useState } from "react";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { HeaderButton } from "../../../shared/ui/header-button/header-button";

import { useGeolocation } from "../lib/hooks/use-geolocation";
import { fetchCity } from "../model/api-actons/fetch-city";
import { fetchHash } from "../model/api-actons/fetch-hash";
import {
  getAuthStatus,
  getGeolocation,
  getGeolocationMode
} from "../model/user-selectors";
import { logout, setGeolocation } from "../model/user-slice";
import { Login } from "./login";
import classes from './header-user.module.sass';

type headerUserProps = {};

export const HeaderUser = memo(({}: headerUserProps) => {
  const dispatch = useAppDispatch();
  const storedLocation = useAppSelector(getGeolocation);
  const locationMode = useAppSelector(getGeolocationMode);
  const isAuth = useAppSelector(getAuthStatus);
  const [ isLogin, setIsLogin ] = useState(false);
  const location = useGeolocation(storedLocation);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      dispatch(setGeolocation(location));
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
});
