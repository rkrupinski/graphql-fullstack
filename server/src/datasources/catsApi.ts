import { RESTDataSource } from "apollo-datasource-rest";
import { CatInput, Scalars } from "../generated/types";

export class CatsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.DB_API_URL;
  }

  getCats() {
    return this.get("/cats");
  }

  getCat(id: string) {
    return this.get(`/cats/${id}`);
  }

  addCat(cat: CatInput) {
    return this.post("/cats", cat);
  }

  updateCat(id: Scalars["ID"], cat: CatInput) {
    return this.patch(`/cats/${id}`, cat);
  }

  deleteCat(id: Scalars["ID"]) {
    return this.delete(`/cats/${id}`);
  }
}
