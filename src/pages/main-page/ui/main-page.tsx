import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../../app/provider/router';

const MainPage = (): JSX.Element => {
  useEffect(() => {
    window.location.replace('https://chinacar.club');
  }, []);

  return <Navigate to={AppRoute.Calc} />;
}

export default MainPage;
