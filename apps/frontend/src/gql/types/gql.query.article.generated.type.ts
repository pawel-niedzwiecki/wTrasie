import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
import { FragmentDataLeadFragmentDoc } from './gql.fragment.lead.generated.type';
import { FragmentDataViewsFragmentDoc } from './gql.fragment.views.generated.type';
import { FragmentDataContentPartTxtFragmentDoc, FragmentDataContentPartMediaFragmentDoc, FragmentDataContentPartQuoteFragmentDoc, FragmentDataContentPartYouTubeFragmentDoc } from './gql.fragment.contentParts.generated.type';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetArticleQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type GetArticleQuery = { __typename?: 'Query', article?: { __typename?: 'ArticleEntityResponse', data?: { __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', type: Types.Enum_Article_Type, title: string, createdAt?: any | null, seo: { __typename?: 'ComponentOthersSeo', id: string, title?: string | null, description?: string | null }, cover: { __typename: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, caption?: string | null, alternativeText?: string | null, formats?: any | null } | null } | null }, lead: { __typename: 'ComponentContentPartsLead', id: string, lead: string }, tags?: { __typename: 'TagRelationResponseCollection', data: Array<{ __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title: string } | null }> } | null, author?: { __typename: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string, avatar?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, caption?: string | null, alternativeText?: string | null, formats?: any | null } | null } | null } | null } | null } | null } | null, views: { __typename: 'ComponentStatsViews', id: string, views: number }, contentparts: Array<{ __typename?: 'ComponentContentPartsMedia', id: string, media: { __typename: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, caption?: string | null, alternativeText?: string | null, formats?: any | null } | null } | null } } | { __typename: 'ComponentContentPartsQuote', id: string, quote: string } | { __typename: 'ComponentContentPartsTxt', id: string, txt: string } | { __typename: 'ComponentContentPartsYoutube', id: string, url: string } | { __typename?: 'Error' } | null> } | null } | null } | null };

export type GetArticlesListQueryVariables = Types.Exact<{
  pageSize: Types.Scalars['Int'];
  page: Types.Scalars['Int'];
  type: Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>;
  idTag?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type GetArticlesListQuery = { __typename?: 'Query', articles?: { __typename?: 'ArticleEntityResponseCollection', data: Array<{ __typename: 'ArticleEntity', id?: string | null, attributes?: { __typename?: 'Article', type: Types.Enum_Article_Type, title: string, createdAt?: any | null, cover: { __typename: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, caption?: string | null, alternativeText?: string | null, formats?: any | null } | null } | null }, tags?: { __typename: 'TagRelationResponseCollection', data: Array<{ __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title: string } | null }> } | null, author?: { __typename: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string, avatar?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, caption?: string | null, alternativeText?: string | null, formats?: any | null } | null } | null } | null } | null } | null } | null, views: { __typename: 'ComponentStatsViews', id: string, views: number } } | null }>, meta: { __typename: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', page: number, total: number, pageSize: number, pageCount: number } } } | null };


export const GetArticleDocument = gql`
    query GetArticle($id: ID) {
  article(id: $id) {
    data {
      __typename
      id
      attributes {
        type
        title
        createdAt
        seo {
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
        contentparts {
          ...FragmentDataContentPartTxt
          ...FragmentDataContentPartMedia
          ...FragmentDataContentPartQuote
          ...FragmentDataContentPartYouTube
        }
      }
    }
  }
}
    ${FragmentDataLeadFragmentDoc}
${FragmentDataViewsFragmentDoc}
${FragmentDataContentPartTxtFragmentDoc}
${FragmentDataContentPartMediaFragmentDoc}
${FragmentDataContentPartQuoteFragmentDoc}
${FragmentDataContentPartYouTubeFragmentDoc}`;

/**
 * __useGetArticleQuery__
 *
 * To run a query within a React component, call `useGetArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArticleQuery(baseOptions?: Apollo.QueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
      }
export function useGetArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
        }
export type GetArticleQueryHookResult = ReturnType<typeof useGetArticleQuery>;
export type GetArticleLazyQueryHookResult = ReturnType<typeof useGetArticleLazyQuery>;
export type GetArticleQueryResult = Apollo.QueryResult<GetArticleQuery, GetArticleQueryVariables>;
export const GetArticlesListDocument = gql`
    query GetArticlesList($pageSize: Int!, $page: Int!, $type: [String]!, $idTag: ID) {
  articles(
    pagination: {pageSize: $pageSize, page: $page}
    filters: {type: {in: $type}, tags: {id: {eq: $idTag}}}
    sort: ["createdAt:DESC"]
  ) {
    data {
      __typename
      id
      attributes {
        type
        title
        createdAt
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
    ${FragmentDataViewsFragmentDoc}`;

/**
 * __useGetArticlesListQuery__
 *
 * To run a query within a React component, call `useGetArticlesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesListQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      type: // value for 'type'
 *      idTag: // value for 'idTag'
 *   },
 * });
 */
export function useGetArticlesListQuery(baseOptions: Apollo.QueryHookOptions<GetArticlesListQuery, GetArticlesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesListQuery, GetArticlesListQueryVariables>(GetArticlesListDocument, options);
      }
export function useGetArticlesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesListQuery, GetArticlesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesListQuery, GetArticlesListQueryVariables>(GetArticlesListDocument, options);
        }
export type GetArticlesListQueryHookResult = ReturnType<typeof useGetArticlesListQuery>;
export type GetArticlesListLazyQueryHookResult = ReturnType<typeof useGetArticlesListLazyQuery>;
export type GetArticlesListQueryResult = Apollo.QueryResult<GetArticlesListQuery, GetArticlesListQueryVariables>;