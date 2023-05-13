import type { ArticleShortDataType } from 'uxu-utils';
import { createSlug, Pagination } from 'uxu-utils';
import { GetSearchQuery } from 'gql';
import { createSlugForType } from '../../function';
import {
  GetDataTypes,
  ParserDataForArticlesTypes
} from './utils.parser.parserDataFromApiGetSearchToArticlesListData.types';
import {
  ParserDataForPaginationTypes
} from "../parserDataFromApiGetArticleListToArticlesListData/utils.parser.parserDataFromApiGetArticleListToArticlesListData.types";


export class ParserDataFromApiGetSearchToArticlesListData {
  getSearchQuery: GetSearchQuery;
  data: ArticleShortDataType[];
  pagination: Pagination

  constructor ( {getSearchQuery, pagination}: {
    getSearchQuery: GetSearchQuery;
    pagination?: Pagination
  } ) {
    this.data = [];
    this.pagination = {
      page: 1,
      pageSize: 1,
      pageCount: 1,
      ...pagination
    };
    this.getSearchQuery = getSearchQuery;
  }

  parserDataForPagination ( pagination: ParserDataForPaginationTypes ) {
    this.pagination = {
      ...this.pagination,
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 1,
      pageCount: pagination?.pageCount || 1,
    };
  }

  parserDataForListArticles ( listArticles?: ParserDataForArticlesTypes ) {
    if ( !listArticles?.length ) return null;

    this.data = listArticles?.map ( art => ({
      content: {
        id: art?.id,
        title: art?.attributes?.title,
        slug: `${createSlugForType ( art?.attributes?.type )}/${art.id}/${createSlug ( art?.attributes?.title )}`,
        createdAt: art?.attributes?.createdAt,
        author: {
          name: art?.attributes?.author?.data?.attributes?.username,
          avatar: {
            src: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.url,
            caption: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.caption,
            alt: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText,
          },
        },
        cover: {
          src: art?.attributes?.cover?.data?.attributes?.url,
          caption: art?.attributes?.cover?.data?.attributes?.caption,
          alt: art?.attributes?.cover?.data?.attributes?.alternativeText,
        },
        tags:
          art?.attributes?.tags?.data?.map ( tag => ({
            title: tag?.attributes?.title,
            slug: `${createSlugForType ( `tag` )}/${tag.id}/${createSlug ( tag?.attributes?.title )}`,
          }) ) || [],
        stats: {ratings: 0, comments: 0, views: 0},
      },
    }) );
  }

  getData (): GetDataTypes {
    const getSearchQuery = this?.getSearchQuery?.search.articles.data;
    this.parserDataForListArticles ( getSearchQuery );
    this.parserDataForPagination ( {__typename: "Pagination", page: 1, pageCount: 1, pageSize: 12, total: 12} )

    return {
      data: this.data,
      pagination: this.pagination
    };
  }
}
