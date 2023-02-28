import { ApolloClient, InMemoryCache } from '@apollo/client';
import { apiUrl } from 'constants/url';

export const client = new ApolloClient({
  uri: `${apiUrl}/graphql`,
  cache: new InMemoryCache(),
});
