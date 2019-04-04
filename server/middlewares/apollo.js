import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';
import { Schema, Types } from '../schema';
import { Resolvers } from '../resolvers';
import { isProduction } from '../../config';

const schema = makeExecutableSchema({
  typeDefs: [...Schema, ...Types],
  resolvers: [...Resolvers]
});

export const useApollo = app => {
  const server = new ApolloServer({ schema, playground: isProduction, introspection: isProduction });

  server.applyMiddleware({ app });
  return server;
};
