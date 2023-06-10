import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
import { FragmentDataLeadFragmentDoc } from './gql.fragment.lead.generated.type';
import { FragmentDataViewsFragmentDoc } from './gql.fragment.views.generated.type';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSearchQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
}>;


export type GetSearchQuery = { __typename?: 'Query', search?: { __typename?: 'SearchResponse', articles?: { __typename?: 'ArticleEntityResponseCollection', data: Array<{ __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', type: Types.Enum_Article_Type, title: string, createdAt?: any | null, lead: { __typename: 'ComponentContentPartsLead', id: string, lead: string }, cover: { __typename: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, caption?: string | null, alternativeText?: string | null, formats?: any | null } | null } | null }, tags?: { __typename: 'TagRelationResponseCollection', data: Array<{ __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title: string } | null }> } | null, author?: { __typename: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string, avatar?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, caption?: string | null, alternativeText?: string | null, formats?: any | null } | null } | null } | null } | null } | null } | null, views: { __typename: 'ComponentStatsViews', id: string, views: number } } | null }> } | null } | null };


export const GetSearchDocument = gql`
    query GetSearch($query: String!) {
  search(query: $query) {
    articles {
      data {
        __typename
        id
        attributes {
          type
          title
          createdAt
          lead {
            ...FragmentDataLead
          }
          cover {
            __typename
            data {
              id
              attributes {
                url
                caption
                alternativeText
                formats
              }
            }
          }
          tags {
            __typename
            data {
              id
              attributes {
                title
              }
            }
          }
          author {
            __typename
            data {
              id
              attributes {
                username
                avatar {
                  data {
                    attributes {
                      url
                      caption
                      alternativeText
                      formats
                    }
                  }
                }
              }
            }
          }
          views {
            ...FragmentDataViews
          }
        }
      }
    }
  }
}
    ${FragmentDataLeadFragmentDoc}
${FragmentDataViewsFragmentDoc}`;

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