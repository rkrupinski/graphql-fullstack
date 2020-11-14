import { InMemoryCache, makeVar } from "@apollo/client";
import { Message } from "./generated/graphql";

export const messagesVar = makeVar<Message[]>([]);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        messages: {
          read() {
            return messagesVar();
          },
        },
      },
    },
  },
});
