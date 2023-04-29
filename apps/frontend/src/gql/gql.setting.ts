import { gql } from '@apollo/client';

export const GET_SETTING_PAGE = gql`
  query SettingPage($page: String!) {
    setting {
      __typename
      data {
        __typename
        id
        attributes {
          socialMedia {
            __typename
            id
            typ
            url
          }
          settingsPages(filters: { page: { eq: $page } }) {
            __typename
            id
            page
            seo {
              __typename
              title
              description
            }
            filter {
              __typename
              id
              key
              typ
              title
              slug
            }
          }
          footer {
            ... on ComponentFooterColumn {
              id
              header
              link {
                id
                url
                rel
                target
                title
              }
            }
          }
        }
      }
    }
  }
`;
