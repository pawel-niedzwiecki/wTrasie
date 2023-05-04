import { gql } from '@apollo/client';

export const FRAGMENT_DATA_FOOTER = gql`
  fragment FragmentDataFooter on ComponentFooterColumn {
    __typename
    id
    header
    link {
      id
      url
      rel
      title
      target
    }
  }
`;
