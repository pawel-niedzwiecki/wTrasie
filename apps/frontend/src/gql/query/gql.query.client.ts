import { gql } from '@apollo/client';
import { FRAGMENT_DATA_ADRESS } from './../fragments';

export const GET_CLIENTS_LIST_WITH_FILTRES_SHORTNAME = gql`
  ${FRAGMENT_DATA_ADRESS}
  query GetClientsListWithFiltresShortName($shortname: [ID]!) {
    clients(filters: { branches: { shortname: { id: { in: $shortname } } } }) {
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
