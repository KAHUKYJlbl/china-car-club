import { PropsWithChildren } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../../../shared/lib/hooks/use-app-selector";
import { AUTH_TOKEN_KEY_NAME } from "../../../../shared/api/token";
import { getAuthStatus } from "../../../../entities/user";
import { AppRoute } from "../lib/routes";

export const PrivateRoute = ({children}: PropsWithChildren) => {
  const [ cookies ] = useCookies([AUTH_TOKEN_KEY_NAME]);
  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus || cookies[AUTH_TOKEN_KEY_NAME]
      ? children
      : <Navigate to={AppRoute.Main} />
  );
};
