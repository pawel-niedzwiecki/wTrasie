import { HttpLink } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';


export const LINK_API_GRAPHQL = new HttpLink({ uri: process.env.NEXT_PUBLIC_LINK_API_GRAPHQL });
export const LINK_API_REST = new RestLink({
  uri: process.env.NEXT_PUBLIC_LINK_API_REST
});
