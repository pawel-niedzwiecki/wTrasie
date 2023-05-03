import type { ArticleDataType } from 'uxu-utils';
import { createSlug } from 'uxu-utils';
import { GetArticleQuery } from 'gql';
import { GetDataTypes, ParserDataForArticleTypes } from './utils.parser.parserDataFromApiGetArticleToArticleData.types';
import { createSlugForType } from '../../function';

export class ParserDataFromApiGetArticleToArticleData {
  isLoading: boolean;
  getArticleData: GetArticleQuery;
  data: ArticleDataType;

  constructor({ getArticleData, isLoading = false }: { getArticleData: GetArticleQuery; isLoading?: boolean }) {
    this.isLoading = isLoading;
    this.getArticleData = getArticleData;
    this.data = {};
  }

  parserDataForArticle(content?: ParserDataForArticleTypes) {
    if (!content) return null;
    this.data = {
      type: content.type,
      title: content.title,
      lead: content.lead.lead,
      createdAt: content.createdAt,
      cover: {
        src: content.cover.data.attributes.url,
        caption: content.cover?.data.attributes.caption,
        alt: content.cover?.data.attributes.alternativeText,
      },
      author: {
        name: content.author.data.attributes.username,
        avatar: {
          src: content.author.data.attributes.avatar.data.attributes.url,
          caption: content.author.data.attributes.avatar.data.attributes.caption,
          alt: content.author.data.attributes.avatar.data.attributes.alternativeText,
        },
      },
      tags:
        content.tags?.data?.map(tag => ({
          title: tag.attributes.title,
          slug: `${createSlugForType('tag')}/${createSlug(tag.attributes.title)}-${tag.id}`,
        })) || [],
      stats: { ratings: 0, comments: 0, views: 0 },
      contentparts: content?.contentparts?.map(content => {
        const data = {
          type: '',
        };

        switch (content.__typename) {
          case 'ComponentContentPartsTxt':
            data['type'] = 'txt';
            data['content'] = content.txt;
            break;
          case 'ComponentContentPartsQuote':
            data['type'] = 'quote';
            data['content'] = content.quote;
            break;
          case 'ComponentContentPartsMedia':
            data['type'] = 'img';
            data['src'] = content.media.data.attributes.url;
            content?.media?.data?.attributes?.caption && (data['caption'] = content.media.data.attributes.caption);
            content?.media?.data?.attributes?.alternativeText && (data['alt'] = content.media.data.attributes.alternativeText);
            break;
        }

        return data;
      }),
    };
  }

  getData(): GetDataTypes {
    const content = this.getArticleData.article.data.attributes;
    this.parserDataForArticle(content);

    console.log(this.data, 'this.data');

    return {
      data: this.data,
      isLoading: this.isLoading,
    };
  }
}
