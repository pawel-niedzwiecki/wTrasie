import { GetArticleQuery } from 'gql';
import type { ArticleDataType } from 'uxu-utils';
import { ContentPartTypeEnum, createSlug } from 'uxu-utils';
import { createSlugForType } from '../../function';
import { parserDataImg } from '../parserDataImg';
import { GetDataTypes } from './parserApiDataToArticle.types';

export class ParserApiDataToArticle {
  isLoading: boolean;
  canonicalURL: string;
  getArticleData: GetArticleQuery;
  data: ArticleDataType;

  constructor ( {getArticleData, isLoading = false, canonicalURL}: {
    getArticleData: GetArticleQuery;
    canonicalURL: string;
    isLoading?: boolean
  } ) {
    this.isLoading = isLoading;
    this.canonicalURL = canonicalURL;
    this.getArticleData = getArticleData;
    this.data = {};
  }

  parserDataForArticle(content) {
    if (!content) return null;

    const { article } = content;
    if (!article) return null;

    const { data } = article;
    if (!data) return null;

    const { id, type, title, lead, createdAt, cover, author, tags, contentparts } = data.attributes || {};

    this.data = {
      pageID: 'wtrasie',
      id: id || 'lack id',
      type: type || null,
      title: title || 'lack title',
      lead: lead?.lead || null,
      createdAt: createdAt || null,
      canonicalURL: this.canonicalURL || null,
      cover: this.parseImage(cover, 'medium'),
      author: {
        name: author?.data?.attributes?.username || null,
        avatar: this.parseImage(author?.data?.attributes?.avatar, 'thumbnail'),
      },
      tags: tags?.data?.map(tag => this.parseTag(tag)) || [],
      stats: {ratings: 0, comments: 0, views: 0},
      contentparts: contentparts?.map((content, i) => this.parseContentPart(content, i)),
    };
  }

  parseImage(image, typeImg) {
    return image ? {
      src: parserDataImg({ attributes: image.data?.attributes || null, typeImg }),
      caption: image.data?.attributes?.caption || null,
      alt: image.data?.attributes?.alternativeText || null,
    } : null;
  }

  parseTag(tag) {
    return {
      title: tag?.attributes?.title || null,
      slug: `${createSlugForType('tag')}/${tag.id}/${createSlug(tag?.attributes?.title)}`,
    };
  }

  parseContentPart(content, i) {
    const data = {
      id: content?.id || `${i}`,
      value: null,
      type: null,
    };

    switch (content?.__typename) {
      case 'ComponentContentPartsTxt':
        data[ 'id' ] = content?.id || `${i}`;
        data[ 'value' ] = content?.txt;
        data[ 'type' ] = ContentPartTypeEnum.PARAGRAPH;
        break;
      case 'ComponentContentPartsYoutube':
        data[ 'id' ] = content?.id || `${i}`;
        data[ 'url' ] = content?.url;
        data[ 'type' ] = ContentPartTypeEnum.EMBEDYOUTUBE;
        break;
      case 'ComponentContentPartsQuote':
        data[ 'id' ] = content?.id || `${i}`;
        data[ 'value' ] = content?.quote;
        data[ 'type' ] = ContentPartTypeEnum?.QUOTE;
        break;
      case 'ComponentContentPartsMedia':
        data[ 'id' ] = content?.id || `${i}`;
        data[ 'type' ] = ContentPartTypeEnum.IMG;

        if (content?.media?.data?.attributes?.url) {
          data[ 'src' ] = parserDataImg({attributes: content?.media?.data?.attributes || null , typeImg: 'medium' });
          data[ 'caption' ] = content?.media?.data?.attributes?.caption || null;
          data[ 'alt' ] = content?.media?.data?.attributes?.alternativeText || null;
        }
        break;
    }

    return data;
  }

  getData (): GetDataTypes {
    this.parserDataForArticle(this.getArticleData);

    return {
      data: this.data,
      isLoading: this.isLoading,
    };
  }
}
