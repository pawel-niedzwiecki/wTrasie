import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
import { FragmentDataAdressFragmentDoc } from './gql.fragment.adress.generated.type';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetClientsListWithFiltresShortNameQueryVariables = Types.Exact<{
  shortname: Array<Types.InputMaybe<Types.Scalars['ID']>> | Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type GetClientsListWithFiltresShortNameQuery = { __typename?: 'Query', clients?: { __typename?: 'ClientEntityResponseCollection', data: Array<{ __typename?: 'ClientEntity', id?: string | null, attributes?: { __typename?: 'Client', branches?: Array<{ __typename?: 'ComponentOthersAdress', phones?: Array<{ __typename: 'ComponentOthersPhone', id: string, phone: string } | null> | null } | null> | null } | null }> } | null };


export const GetClientsListWithFiltresShortNameDocument = gql`
    query GetClientsListWithFiltresShortName($shortname: [ID]!) {
  clients(filters: {branches: {shortname: {id: {in: $shortname}}}}) {
    data {
      id
      attributes {
        branches {
          ...FragmentDataAdress
        }
      }
    }
  }
}
    ${FragmentDataAdressFragmentDoc}`;

/**
 * __useGetClientsListWithFiltresShortNameQuery__
 *
 * To run a query within a React component, call `useGetClientsListWithFiltresShortNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientsListWithFiltresShortNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientsListWithFiltresShortNameQuery({
 *   variables: {
 *      shortname: // value for 'shortname'
 *   },
 * });
 */
export function useGetClientsListWithFiltresShortNameQuery(baseOptions: Apollo.QueryHookOptions<GetClientsListWithFiltresShortNameQuery, GetClientsListWithFiltresShortNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientsListWithFiltresShortNameQuery, GetClientsListWithFiltresShortNameQueryVariables>(GetClientsListWithFiltresShortNameDocument, options);
      }
export function useGetClientsListWithFiltresShortNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientsListWithFiltresShortNameQuery, GetClientsListWithFiltresShortNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientsListWithFiltresShortNameQuery, GetClientsListWithFiltresShortNameQueryVariables>(GetClientsListWithFiltresShortNameDocument, options);
        }
export type GetClientsListWithFiltresShortNameQueryHookResult = ReturnType<typeof useGetClientsListWithFiltresShortNameQuery>;
export type GetClientsListWithFiltresShortNameLazyQueryHookResult = ReturnType<typeof useGetClientsListWithFiltresShortNameLazyQuery>;
export type GetClientsListWithFiltresShortNameQueryResult = Apollo.QueryResult<GetClientsListWithFiltresShortNameQuery, GetClientsListWithFiltresShortNameQueryVariables>;