import { useEffect } from 'react';
import cn from 'classnames';

import { useGeolocation } from '../lib/hooks/use-geolocation';
import { useAppDispatch } from '../../../shared/lib/hooks/use-app-dispatch';
import { clearToken } from '../../../shared/api/token';

import { logout, setGeolocation } from '../model/user-slice';

type UserProps = {
  classes: string[],
};

export const User = ({classes}: UserProps) => {
  const dispatch = useAppDispatch();
  const location = useGeolocation();

  useEffect(() => {
    dispatch(setGeolocation(location));
  }, [location.latitude, location.longitude]);

  const handleClick = () => {
    dispatch(logout());
    clearToken();
  };

  return (
    <div className={cn(classes)} onClick={handleClick}>
      <svg width="24" height="24" aria-hidden="true" fill='none'>
        <use xlinkHref="#logout" />
      </svg>
    </div>
  )
}
