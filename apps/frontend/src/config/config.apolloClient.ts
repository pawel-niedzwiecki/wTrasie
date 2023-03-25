import { ApolloClient, InMemoryCache } from '@apollo/client';
import {api_url} from 'constants/url'

export const client = new ApolloClient({
  uri: `${api_url}/graphql`,
  cache: new InMemoryCache(),
});
