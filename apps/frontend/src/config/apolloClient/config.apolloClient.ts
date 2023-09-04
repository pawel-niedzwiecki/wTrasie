import { ApolloClient } from '@apollo/client';
import { CASCHE } from './config.cache';

export const APOLLO_CLIENT = new ApolloClient({
  ssrMode: true,
  uri: 'https://wtrasie.herokuapp.com/graphql',
  cache: CASCHE,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});
