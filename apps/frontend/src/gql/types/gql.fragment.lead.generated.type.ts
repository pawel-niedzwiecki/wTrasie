import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
export type FragmentDataLeadFragment = { __typename: 'ComponentContentPartsLead', id: string, lead: string };

export const FragmentDataLeadFragmentDoc = gql`
    fragment FragmentDataLead on ComponentContentPartsLead {
  __typename
  id
  lead
}
    `;