import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Query {
    services: [Service!]!
    service(title: String): Service
  }

  type Service {
    link: String!
    title: String
    description: String
    auth: String
    https: Boolean
    cors: String
    category: String
  }
`;
