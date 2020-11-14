import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useAuth } from "./auth/provider";
import { AuthRoute } from "./components/AuthRoute";
import { App } from "./App";
import { Login } from "./Login";
import { Register } from "./Register";
import { Nope } from "./Nope";
import { addMessage } from "./services/messages";
import { MsgType } from "./generated/graphql";

export const Root: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = React.useCallback(() => {
    logout();
    addMessage(MsgType.Success, "You have been successfully logged out");
  }, []);

  return (
    <>
      <AuthRoute path="/" exact strict>
        <Link to="/login">Log in</Link>
        <hr />
      </AuthRoute>

      <AuthRoute path="/" auth>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
        <hr />
      </AuthRoute>

      <AuthRoute path="/" strict exact auth>
        <Link to="/app">App</Link>
      </AuthRoute>

      <Switch>
        <AuthRoute path="/app" component={App} redirectTo="/login" auth />
        <AuthRoute path="/login" component={Login} redirectTo="/app" />
        <AuthRoute path="/register" component={Register} redirectTo="/app" />
        <Route component={Nope} />
      </Switch>
    </>
  );
};
