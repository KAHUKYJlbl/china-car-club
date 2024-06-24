import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { NotFound } from '../../../../pages/not-found';
import { CalcPage } from '../../../../pages/calc-page';
import { ModelPage } from '../../../../pages/model-page';
import { MycarsPage } from '../../../../pages/mycars-page';

import { AppRoute } from '../lib/routes';
import { PrivateRoute } from './private-route';

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={AppRoute.Main}
        element={
          <CalcPage />
        }
      />

      <Route
        path={AppRoute.Model}
        element={
          <PrivateRoute>
            <ModelPage />
          </PrivateRoute>
        }
      />

      <Route
        path={AppRoute.MyCars}
        element={
          <PrivateRoute>
            <MycarsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="*"
        element={<NotFound />}
      />
    </>
  )
);
