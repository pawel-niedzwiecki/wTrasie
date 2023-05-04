import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
export type FragmentDataFooterFragment = { __typename: 'ComponentFooterColumn', id: string, header?: string | null, link?: Array<{ __typename?: 'ComponentOthersLink', id: string, url?: string | null, rel?: Types.Enum_Componentotherslink_Rel | null, title?: string | null, target?: Types.Enum_Componentotherslink_Target | null } | null> | null };

export const FragmentDataFooterFragmentDoc = gql`
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