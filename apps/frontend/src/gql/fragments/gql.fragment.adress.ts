import { gql } from '@apollo/client';
import { FRAGMENT_DATA_PHONE } from './gql.fragment.phone';

export const FRAGMENT_DATA_ADRESS = gql`
  ${FRAGMENT_DATA_PHONE}
  fragment FragmentDataAdress on ComponentOthersPhone {
    ...FragmentDataPhone
  }
`;
