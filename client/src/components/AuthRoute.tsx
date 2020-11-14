import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useAuth } from "../auth/provider";

export type AuthRouteProps = RouteProps & {
  redirectTo?: string;
  auth?: boolean;
};

export const AuthRoute: React.FC<AuthRouteProps> = ({
  redirectTo,
  auth,
  ...routeProps
}) => {
  const { loggedIn } = useAuth();

  return !!auth === loggedIn ? (
    <Route {...routeProps} />
  ) : redirectTo ? (
    <Redirect to={redirectTo} />
  ) : null;
};
