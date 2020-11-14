import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum Breed {
    persian
    bengal
    siamese
  }

  enum MsgType {
    error
    success
  }

  type Cat {
    id: ID!
    name: String!
    breed: Breed!
    gifs: [CatGif!]!
  }

  type CatGif {
    id: ID!
    title: String!
    url: String!
  }

  type Message {
    id: ID!
    type: MsgType!
    content: String!
  }

  type Query {
    cats: [Cat!]!
    cat(id: ID!): Cat
    messages: [Message!]!
  }

  type Mutation {
    addCat(cat: CatInput!): CatMutationResponse!
    updateCat(id: ID!, cat: CatInput!): CatMutationResponse!
    deleteCat(id: ID!): CatMutationResponse!
  }

  type CatMutationResponse {
    success: Boolean!
    message: String
    cat: Cat
  }

  input CatInput {
    name: String!
    breed: Breed!
  }
`;
