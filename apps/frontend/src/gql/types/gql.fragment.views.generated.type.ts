import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
export type FragmentDataViewsFragment = { __typename: 'ComponentStatsViews', id: string, views: number };

export const FragmentDataViewsFragmentDoc = gql`
    fragment FragmentDataViews on ComponentStatsViews {
  __typename
  id
  views
}
    `;