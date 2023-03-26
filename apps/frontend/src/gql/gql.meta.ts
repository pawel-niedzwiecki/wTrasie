import { gql } from '@apollo/client';

export const GET_ARICLES_META_FILTRTYPE_TYPE = gql`
  query ArticlesMetaFiltrType($type: String!) {
    articles(filters: { type: { eq: $type } }) {
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


export const GET_ARICLES_META_FILTRTYPETAG_TYPE = gql`
  query ArticlesMetaFiltrTypeTag($type: String!, $tag: String!) {
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
