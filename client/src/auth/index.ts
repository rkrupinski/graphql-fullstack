import { JWT } from "@shared/domain";
import { post } from "@shared/http";
import { local } from "../services/storage";

const TOKEN_FIELD = "__TOKEN__";

let _token = (local.getItem(TOKEN_FIELD) as JWT) || null;

export const login = async (email: string, password: string) => {
  const { token: tokenStr } = await post<{ token: string }>(
    `${process.env.API_URL}/auth/login`,
    {
      body: JSON.stringify({ email, password }),
    }
  );

  local.setItem(TOKEN_FIELD, tokenStr);
  _token = tokenStr as JWT;
};

export const register = async (email: string, password: string) =>
  post(`${process.env.API_URL}/auth/register`, {
    body: JSON.stringify({ email, password }),
  });

export const logout = () => {
  local.removeItem(TOKEN_FIELD);
  _token = null;
};

export const getToken = () => _token;
