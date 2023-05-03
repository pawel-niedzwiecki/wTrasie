import { gql } from '@apollo/client';

export const FRAGMENT_DATA_VIEWS = gql`
  fragment FragmentDataViews on ComponentStatsViews {
    __typename
    id
    views
  }
`;
