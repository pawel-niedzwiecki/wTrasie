import { gql } from '@apollo/client';


export const GET_ARICLES_META = gql`
  query ArticlesMeta($type: String!, $tag: String!) {
    articles(filters: { type: { eq: $type }, tags: { title: { eq: $tag } } }) {
      meta {
        __typename
        pagination {
          page
          total
          pageSize
          pageCount
          __typename
        }
      }
    }
  }
`;
