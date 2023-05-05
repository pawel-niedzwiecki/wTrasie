import type { ArticleShortDataType } from 'uxu-utils';
import { createSlug } from 'uxu-utils';
import { GetArticlesListQuery, GetArticlesListWithTagQuery } from 'gql';
import { createSlugForType } from '../../function';
import { GetDataTypes, ParserDataForArticlesTypes } from './utils.parser.parserDataFromApiGetArticleListToArticlesListData.types';

export class ParserDataFromApiGetArticleListToArticlesListData {
  isLoading: boolean;
  getArticlesList: GetArticlesListQuery | GetArticlesListWithTagQuery;
  data: ArticleShortDataType[];

  constructor({ getArticlesList, isLoading = false }: { getArticlesList: GetArticlesListQuery | GetArticlesListWithTagQuery; isLoading?: boolean }) {
    this.isLoading = isLoading;
    this.getArticlesList = getArticlesList;
    this.data = [];
  }

  parserDataForListArticles(listArticles?: ParserDataForArticlesTypes) {
    if (!listArticles?.length) return null;

    this.data = listArticles.map(art => ({
      content: {
        id: art.id,
        title: art.attributes.title,
        slug: `${createSlugForType(art.attributes.type)}/${art.id}/${createSlug(art.attributes.title)}`,
        createdAt: art.attributes.createdAt,
        author: {
          name: art.attributes?.author.data.attributes.username || 'autor',
          avatar: {
            src: art.attributes?.author.data.attributes.avatar.data.attributes.url,
            alt: art.attributes?.author.data.attributes.avatar.data.attributes.alternativeText,
          },
        },
        cover: {
          src: art?.attributes?.cover?.data?.attributes?.url,
          alt: art?.attributes?.cover?.data?.attributes?.alternativeText,
        },
        tags:
          art?.attributes?.tags?.data?.map(tag => ({
            title: tag.attributes.title,
            slug: `${createSlugForType(`tag`)}/${createSlug(tag.attributes.title)}-${tag.id}`,
          })) || [],
        stats: { ratings: 0, comments: 0, views: 0 },
      },
    }));
  }

  getData(): GetDataTypes {
    const listArticles = this.getArticlesList.articles.data;
    this.parserDataForListArticles(listArticles);

    return {
      data: this.data,
      isLoading: this.isLoading,
    };
  }
}
