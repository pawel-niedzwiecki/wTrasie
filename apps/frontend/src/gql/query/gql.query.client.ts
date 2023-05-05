import { gql } from '@apollo/client';
import { FRAGMENT_DATA_ADRESS } from './../fragments';

export const GET_CLIENTS_LIST_WITH_FILTRES_CITY = gql`
  ${FRAGMENT_DATA_ADRESS}
  query clients($citys: [ID]!) {
    clients(filters: { branches: { city: { id: { in: $citys } } } }) {
      data {
        id
        attributes {
          branches {
            ... on ComponentOthersAdress {
              phones {
                ... on ComponentOthersPhone {
                  __typename
                  id
                  phone
                }
              }
            }
          }
        }
      }
    }
  }
`;
