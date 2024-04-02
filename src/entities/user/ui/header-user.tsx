import { useEffect } from "react";

import { useAppDispatch } from "../../../shared/lib/hooks/use-app-dispatch";
import { useAppSelector } from "../../../shared/lib/hooks/use-app-selector";
import { HeaderButton } from "../../../shared/ui/header-button/header-button";

import { useGeolocation } from "../lib/hooks/use-geolocation";
import { fetchCity } from "../model/api-actons/fetch-city";
import { setGeolocation } from "../model/user-slice";
import { getGeolocationMode } from "../model/user-selectors";
import classes from './header-user.module.sass';

type headerUserProps = {};

export const HeaderUser = ({}: headerUserProps) => {
  const dispatch = useAppDispatch();
  const location = useGeolocation();
  const locationMode = useAppSelector(getGeolocationMode);

  useEffect(() => {
    dispatch(setGeolocation(location));
    if (location.latitude && location.longitude) {
      dispatch(fetchCity(location));
    }
  }, [location.latitude, location.longitude, locationMode]);

  return (
    <div className={classes.wrapper}>
      <HeaderButton icon='favorite' text='Избранное' type='light' />

      <HeaderButton icon='profile' text='Войти' type='light' />
    </div>
  );
};
