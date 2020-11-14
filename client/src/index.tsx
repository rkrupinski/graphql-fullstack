import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { AuthProvider } from "./auth/provider";
import { authLink } from "./auth/link";
import { cache } from "./cache";
import { Root } from "./Root";

const httpLink = createHttpLink({
  uri: `${process.env.API_URL}/graphql`,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <Router>
        <Route component={Root} />
      </Router>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
