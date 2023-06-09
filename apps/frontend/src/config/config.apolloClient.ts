import { ApolloClient } from '@apollo/client';
import { api_url } from 'constants/url';
import { cache } from './config.cache';

export const client = new ApolloClient({
  ssrMode: true,
  uri: `${api_url}/graphql`,
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});
