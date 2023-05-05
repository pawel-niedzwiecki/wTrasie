import { gql } from '@apollo/client';

export const FRAGMENT_DATA_PHONE = gql`
  fragment FragmentDataPhone on ComponentOthersPhone {
    __typename
    id
    phone
  }
`;
