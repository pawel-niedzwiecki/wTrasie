import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetArticlesCountOfTypeQueryVariables = Types.Exact<{
  type: Types.Scalars['String'];
}>;


export type GetArticlesCountOfTypeQuery = { __typename?: 'Query', articles?: { __typename?: 'ArticleEntityResponseCollection', meta: { __typename: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', page: number, total: number, pageSize: number, pageCount: number } } } | null };

export type GetArticlesCountOfTheTypeAndWithTagQueryVariables = Types.Exact<{
  type: Types.Scalars['String'];
  tag: Types.Scalars['String'];
}>;


export type GetArticlesCountOfTheTypeAndWithTagQuery = { __typename?: 'Query', articles?: { __typename?: 'ArticleEntityResponseCollection', meta: { __typename: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', page: number, total: number, pageSize: number, pageCount: number } } } | null };


export const GetArticlesCountOfTypeDocument = gql`
    query GetArticlesCountOfType($type: String!) {
  articles(filters: {type: {eq: $type}}) {
    meta {
      __typename
      pagination {
        page
        total
        pageSize
        pageCount
      }
    }
  }
}
    `;

/**
 * __useGetArticlesCountOfTypeQuery__
 *
 * To run a query within a React component, call `useGetArticlesCountOfTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesCountOfTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesCountOfTypeQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetArticlesCountOfTypeQuery(baseOptions: Apollo.QueryHookOptions<GetArticlesCountOfTypeQuery, GetArticlesCountOfTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesCountOfTypeQuery, GetArticlesCountOfTypeQueryVariables>(GetArticlesCountOfTypeDocument, options);
      }
export function useGetArticlesCountOfTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesCountOfTypeQuery, GetArticlesCountOfTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesCountOfTypeQuery, GetArticlesCountOfTypeQueryVariables>(GetArticlesCountOfTypeDocument, options);
        }
export type GetArticlesCountOfTypeQueryHookResult = ReturnType<typeof useGetArticlesCountOfTypeQuery>;
export type GetArticlesCountOfTypeLazyQueryHookResult = ReturnType<typeof useGetArticlesCountOfTypeLazyQuery>;
export type GetArticlesCountOfTypeQueryResult = Apollo.QueryResult<GetArticlesCountOfTypeQuery, GetArticlesCountOfTypeQueryVariables>;
export const GetArticlesCountOfTheTypeAndWithTagDocument = gql`
    query GetArticlesCountOfTheTypeAndWithTag($type: String!, $tag: String!) {
  articles(filters: {type: {eq: $type}, tags: {title: {eq: $tag}}}) {
    meta {
      __typename
      pagination {
        page
        total
        pageSize
        pageCount
      }
    }
  }
}
    `;

/**
 * __useGetArticlesCountOfTheTypeAndWithTagQuery__
 *
 * To run a query within a React component, call `useGetArticlesCountOfTheTypeAndWithTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesCountOfTheTypeAndWithTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesCountOfTheTypeAndWithTagQuery({
 *   variables: {
 *      type: // value for 'type'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useGetArticlesCountOfTheTypeAndWithTagQuery(baseOptions: Apollo.QueryHookOptions<GetArticlesCountOfTheTypeAndWithTagQuery, GetArticlesCountOfTheTypeAndWithTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesCountOfTheTypeAndWithTagQuery, GetArticlesCountOfTheTypeAndWithTagQueryVariables>(GetArticlesCountOfTheTypeAndWithTagDocument, options);
      }
export function useGetArticlesCountOfTheTypeAndWithTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesCountOfTheTypeAndWithTagQuery, GetArticlesCountOfTheTypeAndWithTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesCountOfTheTypeAndWithTagQuery, GetArticlesCountOfTheTypeAndWithTagQueryVariables>(GetArticlesCountOfTheTypeAndWithTagDocument, options);
        }
export type GetArticlesCountOfTheTypeAndWithTagQueryHookResult = ReturnType<typeof useGetArticlesCountOfTheTypeAndWithTagQuery>;
export type GetArticlesCountOfTheTypeAndWithTagLazyQueryHookResult = ReturnType<typeof useGetArticlesCountOfTheTypeAndWithTagLazyQuery>;
export type GetArticlesCountOfTheTypeAndWithTagQueryResult = Apollo.QueryResult<GetArticlesCountOfTheTypeAndWithTagQuery, GetArticlesCountOfTheTypeAndWithTagQueryVariables>;