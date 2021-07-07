import { GraphQLUpload } from 'graphql-upload';
import * as queries from './queries';
import * as mutations from './mutations';

// eslint-disable-next-line import/prefer-default-export
export const resolvers = [
  {
    Query: queries,
    Mutation: mutations,
    Upload: GraphQLUpload,
  },
];
