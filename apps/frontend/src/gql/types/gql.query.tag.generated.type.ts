import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
import { FragmentDataLeadFragmentDoc } from './gql.fragment.lead.generated.type';
import { FragmentDataContentPartTxtFragmentDoc, FragmentDataContentPartMediaFragmentDoc, FragmentDataContentPartQuoteFragmentDoc, FragmentDataContentPartYouTubeFragmentDoc } from './gql.fragment.contentParts.generated.type';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTagQueryVariables = Types.Exact<{
  idTag?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type GetTagQuery = { __typename?: 'Query', tag?: { __typename: 'TagEntityResponse', data?: { __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title: string, seo: { __typename: 'ComponentOthersSeo', id: string, title?: string | null, description?: string | null }, cover: { __typename: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, caption?: string | null, alternativeText?: string | null, formats?: any | null } | null } | null }, lead: { __typename: 'ComponentContentPartsLead', id: string, lead: string }, contentparts: Array<{ __typename: 'ComponentContentPartsTxt', id: string, txt: string } | { __typename?: 'Error' } | null> } | null } | null } | null };

export type GetTagsListQueryVariables = Types.Exact<{
  page?: Types.InputMaybe<Types.Scalars['Int']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetTagsListQuery = { __typename?: 'Query', tags?: { __typename: 'TagEntityResponseCollection', data: Array<{ __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', createdAt?: any | null, title: string } | null }>, meta: { __typename: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', page: number, total: number, pageSize: number, pageCount: number } } } | null };


export const GetTagDocument = gql`
    query GetTag($idTag: ID) {
  tag(id: $idTag) {
    __typename
    data {
      id
      attributes {
        title
        seo {
          __typename
          id
          title
          description
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
        lead {
          ...FragmentDataLead
        }
        contentparts {
          ...FragmentDataContentPartTxt
        }
      }
    }
  }
}
    ${FragmentDataLeadFragmentDoc}
${FragmentDataContentPartTxtFragmentDoc}`;

/**
 * __useGetTagQuery__
 *
 * To run a query within a React component, call `useGetTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagQuery({
 *   variables: {
 *      idTag: // value for 'idTag'
 *   },
 * });
 */
export function useGetTagQuery(baseOptions?: Apollo.QueryHookOptions<GetTagQuery, GetTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagQuery, GetTagQueryVariables>(GetTagDocument, options);
      }
export function useGetTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagQuery, GetTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagQuery, GetTagQueryVariables>(GetTagDocument, options);
        }
export type GetTagQueryHookResult = ReturnType<typeof useGetTagQuery>;
export type GetTagLazyQueryHookResult = ReturnType<typeof useGetTagLazyQuery>;
export type GetTagQueryResult = Apollo.QueryResult<GetTagQuery, GetTagQueryVariables>;
export const GetTagsListDocument = gql`
    query getTagsList($page: Int, $pageSize: Int) {
  tags(pagination: {pageSize: $pageSize, page: $page}, sort: ["createdAt:DESC"]) {
    __typename
    data {
      id
      attributes {
        createdAt
        title
      }
    }
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
 * __useGetTagsListQuery__
 *
 * To run a query within a React component, call `useGetTagsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsListQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetTagsListQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsListQuery, GetTagsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsListQuery, GetTagsListQueryVariables>(GetTagsListDocument, options);
      }
export function useGetTagsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsListQuery, GetTagsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsListQuery, GetTagsListQueryVariables>(GetTagsListDocument, options);
        }
export type GetTagsListQueryHookResult = ReturnType<typeof useGetTagsListQuery>;
export type GetTagsListLazyQueryHookResult = ReturnType<typeof useGetTagsListLazyQuery>;
export type GetTagsListQueryResult = Apollo.QueryResult<GetTagsListQuery, GetTagsListQueryVariables>;