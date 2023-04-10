import { gql } from '@apollo/client';

export const GET_LIST_TAGS = gql`
  query ListTags($page: Int) {
    tags(pagination: { pageSize: 12, page: $page }) {
      __typename
      data {
        __typename
        id
        attributes {
          title
        }
      }
    }
  }
`;

export const GET_TAG_DATA = gql`
  query TagData($idTag: ID) {
    tag(id: $idTag) {
      __typename
      data {
        id
        attributes {
          __typename
          title
          cover {
            __typename
            data {
              __typename
              id
              attributes {
                __typename
                alternativeText
                formats
              }
            }
          }
          lead {
            __typename
            ... on ComponentContentPartsLead {
              id
              lead
            }
          }
          seo {
            id
            title
            description
          }
        }
      }
    }
  }
`;
