import { gql } from '@apollo/client';
import { FRAGMENT_DATA_ADRESS } from './../fragments';

export const GET_CLIENTS_LIST_WITH_FILTRES_CITY = gql`
  ${FRAGMENT_DATA_ADRESS}
  query GetClientsListWithFiltresCity($citys: [ID]!) {
    clients(filters: { branches: { city: { id: { in: $citys } } } }) {
      data {
        id
        attributes {
          branches {
            ...FragmentDataAdress
          }
        }
      }
    }
  }
`;
