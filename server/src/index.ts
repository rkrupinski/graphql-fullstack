import "module-alias/register";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ApolloServer, IResolvers } from "apollo-server-express";
import { CatsAPI } from "./datasources/catsApi";
import { GiphyAPI } from "./datasources/giphyApi";
import { resolvers } from "./resolvers";
import { auth, verifyAuth } from "./auth";
import { errorHandler } from "./errorHandler";
import { typeDefs } from "./schema";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as IResolvers,
  dataSources: () => ({
    catsApi: new CatsAPI(),
    giphyApi: new GiphyAPI(process.env.GIPHY_API_KEY),
  }),
  engine: {
    reportSchema: true,
    graphVariant: "current",
  },
});

const app = express();

app.use(cors());
app.use(server.graphqlPath, verifyAuth);
app.use("/auth", bodyParser.json(), auth);
app.use(errorHandler);

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Running at http://localhost:4000${server.graphqlPath}`)
);
