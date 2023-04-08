import { ApolloClient } from '@apollo/client';
import { api_url } from 'constants/url';
import { cache } from './config.cache';


export const client = new ApolloClient({
  uri: `${api_url}/graphql`,
  cache,
});


