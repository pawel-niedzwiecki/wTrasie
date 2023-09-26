import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSearchQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
}>;


export type GetSearchQuery = { __typename?: 'Query', searchResults: { __typename?: 'SearchResults', hits?: Array<{ __typename?: 'Article', id?: string | null, type: Types.Enum_Article_Type, title: string, lead: { __typename?: 'ComponentContentPartsLead', lead: string } } | null> | null } };


export const GetSearchDocument = gql`
    query getSearch($query: String!) {
  searchResults(query: $query) @rest(type: "SearchResults", path: "/search/{args.query}") {
    hits {
      id
      type
      title
      lead {
        lead
      }
    }
  }
}
    `;

/**
 * __useGetSearchQuery__
 *
 * To run a query within a React component, call `useGetSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetSearchQuery(baseOptions: Apollo.QueryHookOptions<GetSearchQuery, GetSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchQuery, GetSearchQueryVariables>(GetSearchDocument, options);
      }
export function useGetSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSearchQuery, GetSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchQuery, GetSearchQueryVariables>(GetSearchDocument, options);
        }
export type GetSearchQueryHookResult = ReturnType<typeof useGetSearchQuery>;
export type GetSearchLazyQueryHookResult = ReturnType<typeof useGetSearchLazyQuery>;
export type GetSearchQueryResult = Apollo.QueryResult<GetSearchQuery, GetSearchQueryVariables>;