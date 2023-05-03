import { gql } from '@apollo/client';

export const GET_ARTICLES_COUNT_OF_TYPE = gql`
  query GetArticlesCountOfType($type: String!) {
    articles(filters: { type: { eq: $type } }) {
      meta {
        __typename
        pagination {
          page
          total
          pageSize
          pageCount
        }
      }
    }
  }
`;

export const GET_ARTICLES_COUNT_OF_TYPE_AND_WITH_TAG = gql`
  query GetArticlesCountOfTheTypeAndWithTag($type: String!, $tag: String!) {
    articles(filters: { type: { eq: $type }, tags: { title: { eq: $tag } } }) {
      meta {
        __typename
        pagination {
          page
          total
          pageSize
          pageCount
        }
      }
    }
  }
`;
