import "isomorphic-fetch";
import { GiphyFetch } from "@giphy/js-fetch-api";

export { IGif as Gif } from "@giphy/js-types";

export const DEFAULT_GIF_COUNT = 3;

export class GiphyAPI {
  private giphy: GiphyFetch;

  constructor(apiKey: string) {
    this.giphy = new GiphyFetch(apiKey);
  }

  initialize() {}

  async getGifs(phrase: string, limit = DEFAULT_GIF_COUNT) {
    const { data } = await this.giphy.search(phrase, { limit });

    return data;
  }
}

export { GIFObject } from "giphy-api";
