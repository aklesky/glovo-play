import { gql } from 'apollo-server';
import Record from './record';
import { categories } from './categories';


const queries = gql`
  type AppQuery {
    Categories: [Categories]
    Stores(category: String!, tag: String): [Record]
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
  categories,
];
