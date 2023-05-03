import { gql } from '@apollo/client';
import { FRAGMENT_DATA_FOOTER } from './../fragments';

export const GET_SETTING_PAGE = gql`
  ${FRAGMENT_DATA_FOOTER}
  query GetSettingPage($page: String!) {
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
            ...FragmentDataFooter
          }
        }
      }
    }
  }
`;
