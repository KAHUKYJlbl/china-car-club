import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { MainPage } from '../../../../pages/main-page';
import { NotFound } from '../../../../pages/not-found';
import { CalcPage } from '../../../../pages/calc-page';

import { AppRoute } from '../lib/routes';

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={AppRoute.Main}
        element={
          <MainPage />
        }
      />
      <Route
        path={AppRoute.Calc}
        element={
          <CalcPage />
        }
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </>
  )
);
