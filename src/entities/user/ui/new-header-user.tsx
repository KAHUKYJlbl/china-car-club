import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { login, logout, setGeolocation } from "../../../entities/user/model/user-slice";
import { AppRoute } from "../../../app/provider/router";
import { AUTH_TOKEN_KEY_NAME, clearToken } from "../../../shared/api/token";
import { CabinetButton } from "../../../shared/ui/header-button";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { getCurrentSiteMode, SiteModes } from "../../settings";

import { Login } from "./login";
import { useGeolocation } from "../lib/hooks/use-geolocation";
import {
  getAuthStatus,
  getFavoritesByIdLoadingStatus,
  getFavoritesCount,
  getFavoritesCountLoadingStatus,
  getGeolocation,
  getGeolocationMode,
} from "../model/user-selectors";
import { fetchHash } from "../model/api-actions/fetch-hash";
import { fetchCity } from "../model/api-actions/fetch-city";
import { fetchFavoritesCount } from "../model/api-actions/fetch-favorites-count";
import classes from "./new-header-user.module.sass";

type NewHeaderUserProps = {};

export const NewHeaderUser = ({}: NewHeaderUserProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const storedLocation = useAppSelector(getGeolocation);
  const location = useGeolocation(storedLocation);
  const [cookies] = useCookies([AUTH_TOKEN_KEY_NAME]);

  const [isLogin, setIsLogin] = useState(false);

  const locationMode = useAppSelector(getGeolocationMode);
  const isAuth = useAppSelector(getAuthStatus);
  const favoritesCount = useAppSelector(getFavoritesCount);
  const favoritesCountLoadingStatus = useAppSelector(getFavoritesCountLoadingStatus);
  const favoritesByIdLoadingStatus = useAppSelector(getFavoritesByIdLoadingStatus);
  const mode = useAppSelector(getCurrentSiteMode);

  useEffect(() => {
    if (!favoritesCountLoadingStatus.isLoading && isAuth) {
      dispatch(fetchFavoritesCount(mode));
    }
  }, [isAuth]);

  useEffect(() => {
    if (favoritesCountLoadingStatus.isIdle && favoritesByIdLoadingStatus.isSuccess) {
      dispatch(fetchFavoritesCount(mode));
    }
  }, [favoritesByIdLoadingStatus.isSuccess]);

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
    <div className={classes.wrapper}>
      {isAuth && (
        <>
          <CabinetButton
            label="мои автомобили"
            icon="cabinet-mycars"
            callback={() =>
              navigate([mode === SiteModes.New ? "" : AppRoute.Used, AppRoute.MyCars, "/", AppRoute.Orders].join(""))
            }
          />

          <CabinetButton
            label="избранное"
            icon="cabinet-favorite"
            labelCount={favoritesCount}
            callback={() =>
              navigate([mode === SiteModes.New ? "" : AppRoute.Used, AppRoute.MyCars, "/", AppRoute.Favorites].join(""))
            }
          />
        </>
      )}

      <CabinetButton
        label={isAuth ? "выход" : "вход"}
        icon={isAuth ? "cabinet-logout" : "cabinet-profile"}
        callback={handleLoginClick}
      />

      {isLogin && (
        <Login
          onClose={() => setIsLogin(false)}
          onLogin={() => null}
        />
      )}
    </div>
  );
};
