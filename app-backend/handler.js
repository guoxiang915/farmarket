import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  // graphiqlLambda,
  ApolloServer,
} from 'apollo-server-lambda';
// import lambdaPlayground from 'graphql-playground-middleware-lambda';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { loadTypedefsSync } from '@graphql-tools/load';
// import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { schema } from './graphql';
import { resolvers } from './resolvers';
import { createContext } from './context';

// const sources = loadTypedefsSync('./graphql/schema.graphql', {
//   loaders: [new GraphQLFileLoader()],
// });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  logger: console,
  tracing: true,
  context: createContext,
});
exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
  },
});

// for local endpointURL is /graphql and for prod it is /stage/graphql
// exports.playgroundHandler = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   return lambdaPlayground({
//     endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
//       ? process.env.REACT_APP_GRAPHQL_ENDPOINT
//       : '/production/graphql',
//   })(event, context, callback);
// };

// exports.graphiqlHandler = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   return graphiqlLambda({
//     endpointURL: process.env.REACT_APP_GRAPHQL_ENDPOINT
//       ? process.env.REACT_APP_GRAPHQL_ENDPOINT
//       : '/production/graphql',
//   })(event, context, callback);
// };
