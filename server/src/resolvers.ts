import { Request, Response } from "express";
import { Resolvers } from "./generated/types";
import { CatsAPI } from "./datasources/catsApi";
import { GiphyAPI, Gif } from "./datasources/giphyApi";

type Context = {
  req: Request;
  res: Response;
  dataSources: {
    catsApi: CatsAPI;
    giphyApi: GiphyAPI;
  };
};

export const resolvers: Resolvers<Context> = {
  Query: {
    cats(parent, args, { dataSources }, info) {
      return dataSources.catsApi.getCats();
    },
    cat(parent, args, { dataSources }, info) {
      return dataSources.catsApi.getCat(args.id);
    },
  },

  Mutation: {
    async addCat(parent, args, { dataSources }, info) {
      try {
        const cat = await dataSources.catsApi.addCat(args.cat);

        return {
          success: true,
          message: "ok",
          cat,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
        };
      }
    },
    async updateCat(patent, args, { dataSources }, info) {
      try {
        const cat = await dataSources.catsApi.updateCat(args.id, args.cat);

        return {
          success: true,
          message: "ok",
          cat,
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
        };
      }
    },
    async deleteCat(parent, args, { dataSources }, info) {
      try {
        await dataSources.catsApi.deleteCat(args.id);

        return {
          success: true,
          message: "ok",
        };
      } catch (err) {
        return {
          success: false,
          message: err.message,
        };
      }
    },
  },

  Cat: {
    async gifs(parent, args, { dataSources }, info) {
      const results = await dataSources.giphyApi.getGifs(`${parent.breed} cat`);

      return results.map((gif: Gif) => ({
        id: `${gif.id}`,
        title: gif.title,
        url: gif.images.original.url,
      }));
    },
  },
};
