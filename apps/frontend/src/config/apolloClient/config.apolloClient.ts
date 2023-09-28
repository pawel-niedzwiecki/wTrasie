import { ApolloClient, ApolloLink } from '@apollo/client';
import { CACHE } from './config.cache';
import { LINK_API_GRAPHQL, LINK_API_REST} from './config.links';

export const APOLLO_CLIENT = new ApolloClient({
  ssrMode: true,
  link: ApolloLink.from([ LINK_API_REST, LINK_API_GRAPHQL ]),
  cache: CACHE,
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
  }
});
