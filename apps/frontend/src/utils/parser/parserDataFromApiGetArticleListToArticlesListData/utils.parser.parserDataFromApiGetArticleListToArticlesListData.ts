import type { ArticleShortDataType } from 'uxu-utils';
import { createSlug, Pagination } from 'uxu-utils';
import { GetArticlesListQuery } from 'gql';
import { createSlugForType } from '../../function';
import { parserDataImg } from '../parserDataImg';
import {
  GetDataTypes,
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

  parserDataForPagination (pagination: GetArticlesListQuery) {
    this.pagination = {
      ...this.pagination,
      page: pagination?.articles.meta.pagination.page || 1,
      pageSize: pagination?.articles.meta.pagination.pageSize || 1,
      pageCount: pagination?.articles.meta.pagination.pageCount || 1,
    };
  }

  parserDataForListArticles ( listArticles?: GetArticlesListQuery ) {
    if ( !listArticles?.articles?.data?.length ) return null;

    this.data = listArticles?.articles?.data?.map ( art => ({
      content: {
        id: art?.id,
        title: art?.attributes?.title || null,
        slug: `${createSlugForType ( art?.attributes?.type )}/${art?.id}/${createSlug ( art?.attributes?.title || null )}`,
        createdAt: art?.attributes?.createdAt || null,
        author: {
          name: art?.attributes?.author?.data?.attributes?.username || null,
          avatar: {
            src: parserDataImg({attributes: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes || null , typeImg: 'thumbnail' }),
            alt: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText || null,
          },
        },
        cover: {
          src: parserDataImg({attributes: art?.attributes?.cover?.data?.attributes|| null , typeImg: 'small' }),
          alt: art?.attributes?.cover?.data?.attributes?.alternativeText || null,
        },
        tags:
          art?.attributes?.tags?.data?.map ( tag => ({
            title: tag?.attributes?.title,
            slug: `${createSlugForType ( `tag` )}/${tag?.id}/${createSlug ( tag?.attributes?.title || null )}`,
          }) ) || [],
        stats: {ratings: 0, comments: 0, views: 0},
      },
    }) );
  }

  getData (): GetDataTypes {
    this.parserDataForListArticles ( this?.getArticlesList );
    this.parserDataForPagination( this?.getArticlesList )

    return {
      data: this.data,
      pagination: this.pagination
    };
  }
}
