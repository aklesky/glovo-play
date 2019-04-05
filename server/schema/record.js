import { gql } from "apollo-server";

export const schedule = gql`
  type Schedule {
    day: Int
    open: String
    close: String
  }
`

export const record = gql`
  type Record {
    id: ID!
    name: String
    description: String
    tags: [String]
    schedule: [Schedule]
    active: Boolean
  }
`;

export default () => [record, schedule];
