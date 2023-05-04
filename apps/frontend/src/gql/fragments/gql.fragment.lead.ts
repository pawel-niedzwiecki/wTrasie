import { gql } from '@apollo/client';

export const FRAGMENT_DATA_LEAD = gql`
  fragment FragmentDataLead on ComponentContentPartsLead {
    __typename
    id
    lead
  }
`;
