import * as React from "react";
import { useApolloClient } from "@apollo/client";
import { getToken, login, logout, register } from ".";

export type AuthContext = {
  loggedIn: boolean;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContext | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const client = useApolloClient();
  const [loading, setLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(!!getToken());

  const _login = async (email: string, password: string) => {
    setLoading(true);

    try {
      await login(email, password);
      setLoggedIn(!!getToken());
    } finally {
      setLoading(false);
    }
  };

  const _logout = () => {
    logout();
    setLoggedIn(!!getToken());
    client.resetStore();
  };

  const _register = async (email: string, password: string) => {
    setLoading(true);

    try {
      await register(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        loggedIn,
        login: _login,
        logout: _logout,
        register: _register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext);
  if (!auth) throw new Error("No AuthProvider found");
  return auth;
};
