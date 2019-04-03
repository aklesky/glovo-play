import { gql } from "apollo-server";

export const categories = gql`
  type Categories {
    id: ID!
    label: String
    name: String
    openIcon: String
    sleepIcon: String
  }
`;
