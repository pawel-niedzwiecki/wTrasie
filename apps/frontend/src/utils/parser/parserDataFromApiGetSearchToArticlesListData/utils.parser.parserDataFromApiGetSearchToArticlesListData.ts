import type { ArticleShortDataType } from 'uxu-utils';
import { createSlug, Pagination } from 'uxu-utils';
import { GetSearchQuery } from 'gql';
import { createSlugForType } from '../../function';
import { parserDataImg } from '../parserDataImg';
import {
  GetDataTypes,
  ParserDataForPaginationTypes
} from "./utils.parser.parserDataFromApiGetSearchToArticlesListData.types";


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

  parserDataForListArticles ( listArticles?: GetSearchQuery ) {
    if ( !listArticles?.search?.articles?.data?.length ) return null;

    this.data = listArticles?.search?.articles?.data?.map ( art => ({
      content: {
        id: art?.id,
        title: art?.attributes?.title,
        slug: `${createSlugForType ( art?.attributes?.type )}/${art.id}/${createSlug ( art?.attributes?.title )}`,
        createdAt: art?.attributes?.createdAt,
        author: {
          name: art?.attributes?.author?.data?.attributes?.username,
          avatar: {
            src: parserDataImg({attributes: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes , typeImg: "thumbnail"}),
            caption: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.caption,
            alt: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText,
          },
        },
        cover: {
          src: parserDataImg({attributes: art?.attributes?.cover?.data?.attributes , typeImg: "medium"}),
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
    this.parserDataForListArticles ( this?.getSearchQuery );
    this.parserDataForPagination ( {__typename: "Pagination", page: 1, pageCount: 1, pageSize: 12, total: 12} )

    return {
      data: this.data,
      pagination: this.pagination
    };
  }
}
