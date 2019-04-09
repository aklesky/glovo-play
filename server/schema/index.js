import { gql } from 'apollo-server';
import Record from './record';


const queries = gql`
  type AppQuery {
    Categories: [Categories]
    Category(category: String!, tag: String): Category
  }
`;

const schema = gql`
  schema {
    query: AppQuery
  }
`;

export const Schema = [schema, queries];

export const Types = [
  Record,
];
