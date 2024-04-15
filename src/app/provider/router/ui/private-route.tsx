import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../../../shared/lib/hooks/use-app-selector";
import { getAuthStatus } from "../../../../entities/user";
import { AppRoute } from "../lib/routes";

export const PrivateRoute = ({children}: PropsWithChildren) => {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus
      ? children
      : <Navigate to={AppRoute.Main} />
  );
};
