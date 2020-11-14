import { setContext } from "@apollo/client/link/context";
import { getToken } from ".";

export const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${getToken()}` : "",
    },
  };
});
