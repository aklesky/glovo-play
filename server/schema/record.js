import { gql } from 'apollo-server';
import { categories } from './categories';

export const schedule = gql`
  type Schedule {
    day: Int
    open: String
    close: String
  }
`;

export const store = gql`
  type Store {
    id: ID!
    name: String
    description: String
    tags: [String]
    schedule: [Schedule]
    is_closed: Boolean
    open: String
  }
`;

export const category = gql`
  type Category {
    current: Categories
    stores: [Store]
  }
`;

export default () => [store, schedule, categories, category];
