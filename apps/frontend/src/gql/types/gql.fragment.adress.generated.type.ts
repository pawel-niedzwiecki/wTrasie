import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
import { FragmentDataPhoneFragmentDoc } from './gql.fragment.phone.generated.type';
export type FragmentDataAdressFragment = { __typename?: 'ComponentOthersAdress', phones?: Array<{ __typename: 'ComponentOthersPhone', id: string, phone: string } | null> | null };

export const FragmentDataAdressFragmentDoc = gql`
    fragment FragmentDataAdress on ComponentOthersAdress {
  phones {
    ...FragmentDataPhone
  }
}
    ${FragmentDataPhoneFragmentDoc}`;