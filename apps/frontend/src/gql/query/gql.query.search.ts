import { gql } from '@apollo/client';
import { FRAGMENT_DATA_LEAD, FRAGMENT_DATA_VIEWS } from './../fragments';

export const GET_SEARCH = gql`
  ${FRAGMENT_DATA_LEAD}
  ${FRAGMENT_DATA_VIEWS}
  query GetSearch($query: String!) {
    search(query: $query) {
      articles {
        data {
          __typename
          id
          attributes {
            type
            title
            createdAt
            lead {
              ...FragmentDataLead
            }
            cover {
              __typename
              data {
                id
                attributes {
                  url
                  caption
                  alternativeText
                }
              }
            }
            tags {
              __typename
              data {
                id
                attributes {
                  title
                }
              }
            }
            author {
              __typename
              data {
                id
                attributes {
                  username
                  avatar {
                    data {
                      attributes {
                        url
                        caption
                        alternativeText
                      }
                    }
                  }
                }
              }
            }
            views {
              ...FragmentDataViews
            }
          }
        }
      }
    }
  }
`;
