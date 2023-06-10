import { gql } from '@apollo/client';
import { FRAGMENT_DATA_LEAD } from './../fragments';

export const GET_TAG = gql`
  ${FRAGMENT_DATA_LEAD}
  query GetTag($idTag: ID) {
    tag(id: $idTag) {
      __typename
      data {
        id
        attributes {
          title
          seo {
            __typename
            id
            title
            description
          }
          cover {
            __typename
            data {
              id
              attributes {
                url
                caption
                alternativeText
                formats
              }
            }
          }
          lead {
            ...FragmentDataLead
          }
        }
      }
    }
  }
`;

export const GET_TAGS_LIST = gql`
  query getTagsList($page: Int, $pageSize: Int) {
    tags(pagination: { pageSize: $pageSize, page: $page }, sort: ["createdAt:DESC"]) {
      __typename
      data {
        id
        attributes {
          createdAt
          title
        }
      }
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
