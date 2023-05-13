import type { ArticleShortDataType } from 'uxu-utils';
import { createSlug, Pagination } from 'uxu-utils';
import { GetArticlesListQuery } from 'gql';
import { createSlugForType } from '../../function';
import {
  GetDataTypes,
  ParserDataForArticlesTypes,
  ParserDataForPaginationTypes
} from './utils.parser.parserDataFromApiGetArticleListToArticlesListData.types';

export class ParserDataFromApiGetArticleListToArticlesListData {
  getArticlesList: GetArticlesListQuery;
  data: ArticleShortDataType[];
  pagination: Pagination

  constructor ( {getArticlesList, pagination}: {
    getArticlesList: GetArticlesListQuery;
    pagination?: Pagination
  } ) {
    this.data = [];
    this.pagination = {
      page: 1,
      pageSize: 1,
      pageCount: 1,
      ...pagination
    };
    this.getArticlesList = getArticlesList;
  }

  parserDataForPagination (pagination: ParserDataForPaginationTypes) {
    this.pagination = {
      ...this.pagination,
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 1,
      pageCount: pagination?.pageCount || 1,
    };
  }

  parserDataForListArticles ( listArticles?: ParserDataForArticlesTypes ) {
    if ( !listArticles?.length ) return null;

    this.data = listArticles.map ( art => ({
      content: {
        id: art?.id,
        title: art?.attributes?.title,
        slug: `${createSlugForType ( art?.attributes?.type )}/${art?.id}/${createSlug ( art?.attributes?.title )}`,
        createdAt: art?.attributes?.createdAt,
        author: {
          name: art?.attributes?.author?.data?.attributes?.username,
          avatar: {
            src: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.url,
            alt: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText,
          },
        },
        cover: {
          src: art?.attributes?.cover?.data?.attributes?.url,
          alt: art?.attributes?.cover?.data?.attributes?.alternativeText,
        },
        tags:
          art?.attributes?.tags?.data?.map ( tag => ({
            title: tag?.attributes?.title,
            slug: `${createSlugForType ( `tag` )}/${tag?.id}/${createSlug ( tag?.attributes?.title )}`,
          }) ) || [],
        stats: {ratings: 0, comments: 0, views: 0},
      },
    }) );
  }

  getData (): GetDataTypes {
    const pagination = this?.getArticlesList?.articles.meta.pagination;
    const listArticles = this?.getArticlesList?.articles?.data;
    this.parserDataForListArticles ( listArticles );
    this.parserDataForPagination( pagination )

    return {
      data: this.data,
      pagination: this.pagination
    };
  }
}
