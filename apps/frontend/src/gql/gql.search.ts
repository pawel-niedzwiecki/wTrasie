import { gql } from '@apollo/client';


export const GET_SEARCH = gql`
  query Search($query: String!) {
    search(query: $query) {
      articles {
        data {
          __typename
          id
          attributes {
            createdAt
            title
            type
            cover {
              data {
                id
                attributes {
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
            tags {
              __typename
              data {
                id
                attributes {
                  __typename
                  title
                }
              }
            }
            author {
              __typename
              data {
                id
                __typename
                attributes {
                  __typename
                  username
                  avatar {
                    __typename
                    data {
                      attributes {
                        alternativeText
                        formats
                      }
                    }
                  }
                }
              }
            }
            views {
              id
              __typename
              ... on ComponentStatsViews {
                id
                views
              }
            }
          }
        }
      }
    }
  }
`;
