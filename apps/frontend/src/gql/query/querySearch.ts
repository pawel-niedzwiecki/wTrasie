import { gql } from '@apollo/client';

export const GET_SEARCH = gql`
  query getSearch($query: String!) {
    searchResults(query: $query) @rest(type: "SearchResults", path: "/search/{args.query}") {
      hits {
        id
        type
        title
        lead {
          lead
        }
      }
    }
  }
`;


