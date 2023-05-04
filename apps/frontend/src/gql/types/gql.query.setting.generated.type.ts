import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
import { FragmentDataFooterFragmentDoc } from './gql.fragment.footer.generated.type';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSettingPageQueryVariables = Types.Exact<{
  page: Types.Scalars['String'];
}>;


export type GetSettingPageQuery = { __typename?: 'Query', setting?: { __typename: 'SettingEntityResponse', data?: { __typename: 'SettingEntity', id?: string | null, attributes?: { __typename?: 'Setting', socialMedia: Array<{ __typename: 'ComponentOthersPagesSocialMedia', id: string, typ?: Types.Enum_Componentotherspagessocialmedia_Typ | null, url: string } | null>, settingsPages: Array<{ __typename: 'ComponentOthersSettingPage', id: string, page: string, seo: { __typename: 'ComponentOthersSeo', title?: string | null, description?: string | null }, filter: Array<{ __typename: 'ComponentOthersSiteBarFilters', id: string, key?: string | null, typ: Types.Enum_Componentotherssitebarfilters_Typ, title: string, slug: string } | null> } | null>, footer: Array<{ __typename: 'ComponentFooterColumn', id: string, header?: string | null, link?: Array<{ __typename?: 'ComponentOthersLink', id: string, url?: string | null, rel?: Types.Enum_Componentotherslink_Rel | null, title?: string | null, target?: Types.Enum_Componentotherslink_Target | null } | null> | null } | { __typename?: 'Error' } | null> } | null } | null } | null };


export const GetSettingPageDocument = gql`
    query GetSettingPage($page: String!) {
  setting {
    __typename
    data {
      __typename
      id
      attributes {
        socialMedia {
          __typename
          id
          typ
          url
        }
        settingsPages(filters: {page: {eq: $page}}) {
          __typename
          id
          page
          seo {
            __typename
            title
            description
          }
          filter {
            __typename
            id
            key
            typ
            title
            slug
          }
        }
        footer {
          ...FragmentDataFooter
        }
      }
    }
  }
}
    ${FragmentDataFooterFragmentDoc}`;

/**
 * __useGetSettingPageQuery__
 *
 * To run a query within a React component, call `useGetSettingPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSettingPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSettingPageQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetSettingPageQuery(baseOptions: Apollo.QueryHookOptions<GetSettingPageQuery, GetSettingPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSettingPageQuery, GetSettingPageQueryVariables>(GetSettingPageDocument, options);
      }
export function useGetSettingPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSettingPageQuery, GetSettingPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSettingPageQuery, GetSettingPageQueryVariables>(GetSettingPageDocument, options);
        }
export type GetSettingPageQueryHookResult = ReturnType<typeof useGetSettingPageQuery>;
export type GetSettingPageLazyQueryHookResult = ReturnType<typeof useGetSettingPageLazyQuery>;
export type GetSettingPageQueryResult = Apollo.QueryResult<GetSettingPageQuery, GetSettingPageQueryVariables>;