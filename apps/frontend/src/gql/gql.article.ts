import { gql } from '@apollo/client';

export const GET_LIST_ARICLES = gql`
  query ListArticles($page: Int!) {
    articles(pagination: { pageSize: 12, page: $page }) {
      data {
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
