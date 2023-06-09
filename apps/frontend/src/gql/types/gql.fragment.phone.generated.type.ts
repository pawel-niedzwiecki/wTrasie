import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
export type FragmentDataPhoneFragment = { __typename: 'ComponentOthersPhone', id: string, phone: string };

export const FragmentDataPhoneFragmentDoc = gql`
    fragment FragmentDataPhone on ComponentOthersPhone {
  __typename
  id
  phone
}
    `;