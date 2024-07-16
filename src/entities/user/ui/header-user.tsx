import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { AUTH_TOKEN_KEY_NAME, clearToken } from "../../../shared/api/token";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { HeaderButton } from "../../../shared/ui/header-button/ui/header-button";

import { useGeolocation } from "../lib/hooks/use-geolocation";
import { fetchCity } from "../model/api-actions/fetch-city";
import { fetchHash } from "../model/api-actions/fetch-hash";
import {
  getAuthStatus,
  getGeolocation,
  getGeolocationMode
} from "../model/user-selectors";
import { login, logout, setGeolocation } from "../model/user-slice";
import { Login } from "./login";
import classes from './header-user.module.sass';
import { AppRoute } from "../../../app/provider/router";

type headerUserProps = {};

export const HeaderUser = memo(({}: headerUserProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedLocation = useAppSelector(getGeolocation);
  const locationMode = useAppSelector(getGeolocationMode);
  const isAuth = useAppSelector(getAuthStatus);
  const [ cookies ] = useCookies([AUTH_TOKEN_KEY_NAME]);
  const [ isLogin, setIsLogin ] = useState(false);
  const location = useGeolocation(storedLocation);

  useEffect(() => {
    if (cookies[AUTH_TOKEN_KEY_NAME]) {
      dispatch(login());
    }
  }, [cookies[AUTH_TOKEN_KEY_NAME]]);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      dispatch(setGeolocation(location));
      dispatch(fetchCity(location));
    }
  }, [location.latitude, location.longitude, locationMode]);

  const handleLoginClick = () => {
    if (isAuth) {
      clearToken();
      dispatch(logout());
    } else {
      dispatch(fetchHash());
      setIsLogin(true);
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        {
          isAuth &&
          <>
            <HeaderButton icon='mycars' text='Мои&nbsp;автомобили' type='light' onClick={() => navigate(AppRoute.MyCars)} />

            <HeaderButton icon='favorite' text='Избранное' type='light' onClick={() => null} />
          </>
        }

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
