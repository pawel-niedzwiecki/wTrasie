import type { ArticleShortDataType } from 'uxu-utils';
import { createSlug } from 'uxu-utils';
import { GetArticlesListWithTagQuery, GetSearchQuery } from 'gql';
import { createSlugForType } from '../../function';
import { GetDataTypes, ParserDataForArticlesTypes } from './utils.parser.parserDataFromApiGetSearchToArticlesListData.types';

export class ParserDataFromApiGetSearchToArticlesListData {
  isLoading: boolean;
  getSearchQuery: GetSearchQuery;
  data: ArticleShortDataType[];

  constructor({ getSearchQuery, isLoading = false }: { getSearchQuery: GetSearchQuery | GetArticlesListWithTagQuery; isLoading?: boolean }) {
    this.isLoading = isLoading;
    this.getSearchQuery = getSearchQuery;
    this.data = [];
  }

  parserDataForListArticles(listArticles?: ParserDataForArticlesTypes) {
    if (!listArticles?.length) return null;

    this.data = listArticles?.map(art => ({
      content: {
        id: art?.id,
        title: art?.attributes?.title,
        slug: `${createSlugForType(art?.attributes?.type)}/${art.id}/${createSlug(art?.attributes?.title)}`,
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
          art?.attributes?.tags?.data?.map(tag => ({
            title: tag?.attributes?.title,
            slug: `${createSlugForType(`tag`)}/${tag.id}/${createSlug(tag?.attributes?.title)}`,
          })) || [],
        stats: { ratings: 0, comments: 0, views: 0 },
      },
    }));
  }

  getData(): GetDataTypes {
    const listArticles = this?.getSearchQuery?.search?.articles?.data;
    this.parserDataForListArticles(listArticles);

    return {
      data: this.data,
      isLoading: this.isLoading,
    };
  }
}
