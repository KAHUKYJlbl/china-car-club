import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { NotFound } from "../../../../pages/not-found";
import { CalcPage } from "../../../../pages/calc-page";
import { ModelPage } from "../../../../pages/model-page";
import { MycarsPage } from "../../../../pages/mycars-page";
import { UsedListPage } from "../../../../pages/used-list-page";
import { Mycars } from "../../../../widgets/mycars";

import { AppRoute } from "../lib/routes";
import { PrivateRoute } from "./private-route";

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={AppRoute.Main}
        element={<CalcPage />}
      />

      <Route
        path={AppRoute.MyCars}
        element={
          <PrivateRoute>
            <MycarsPage />
          </PrivateRoute>
        }
      >
        <Route
          path={AppRoute.Orders}
          element={<Mycars folder="orders" />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<Mycars folder="favorites" />}
        />
        <Route
          path={AppRoute.Calculations}
          element={<Mycars folder="calculations" />}
        />
      </Route>

      <Route path={AppRoute.Used}>
        <Route
          index
          element={<UsedListPage />}
        />
        <Route
          path={AppRoute.UsedModel}
          element={
            <PrivateRoute>
              <ModelPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.UsedMyCars}
          element={
            <PrivateRoute>
              <MycarsPage />
            </PrivateRoute>
          }
        >
          <Route
            path={AppRoute.Orders}
            element={<Mycars folder="orders" />}
          />
          <Route
            path={AppRoute.Favorites}
            element={<Mycars folder="favorites" />}
          />
          <Route
            path={AppRoute.Calculations}
            element={<Mycars folder="calculations" />}
          />
        </Route>
      </Route>

      <Route
        path={AppRoute.Model}
        element={
          <PrivateRoute>
            <ModelPage />
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
