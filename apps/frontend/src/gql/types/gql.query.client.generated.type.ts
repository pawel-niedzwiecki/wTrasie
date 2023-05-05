import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
import { FragmentDataAdressFragmentDoc } from './gql.fragment.adress.generated.type';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetClientsListWithFiltresCityQueryVariables = Types.Exact<{
  citys: Array<Types.InputMaybe<Types.Scalars['ID']>> | Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type GetClientsListWithFiltresCityQuery = { __typename?: 'Query', clients?: { __typename?: 'ClientEntityResponseCollection', data: Array<{ __typename?: 'ClientEntity', id?: string | null, attributes?: { __typename?: 'Client', branches?: Array<{ __typename?: 'ComponentOthersAdress', phones?: Array<{ __typename: 'ComponentOthersPhone', id: string, phone: string } | null> | null } | null> | null } | null }> } | null };


export const GetClientsListWithFiltresCityDocument = gql`
    query GetClientsListWithFiltresCity($citys: [ID]!) {
  clients(filters: {branches: {city: {id: {in: $citys}}}}) {
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
 * __useGetClientsListWithFiltresCityQuery__
 *
 * To run a query within a React component, call `useGetClientsListWithFiltresCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientsListWithFiltresCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientsListWithFiltresCityQuery({
 *   variables: {
 *      citys: // value for 'citys'
 *   },
 * });
 */
export function useGetClientsListWithFiltresCityQuery(baseOptions: Apollo.QueryHookOptions<GetClientsListWithFiltresCityQuery, GetClientsListWithFiltresCityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientsListWithFiltresCityQuery, GetClientsListWithFiltresCityQueryVariables>(GetClientsListWithFiltresCityDocument, options);
      }
export function useGetClientsListWithFiltresCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientsListWithFiltresCityQuery, GetClientsListWithFiltresCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientsListWithFiltresCityQuery, GetClientsListWithFiltresCityQueryVariables>(GetClientsListWithFiltresCityDocument, options);
        }
export type GetClientsListWithFiltresCityQueryHookResult = ReturnType<typeof useGetClientsListWithFiltresCityQuery>;
export type GetClientsListWithFiltresCityLazyQueryHookResult = ReturnType<typeof useGetClientsListWithFiltresCityLazyQuery>;
export type GetClientsListWithFiltresCityQueryResult = Apollo.QueryResult<GetClientsListWithFiltresCityQuery, GetClientsListWithFiltresCityQueryVariables>;