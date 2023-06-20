import { GetArticleQuery } from 'gql';
import type { ArticleDataType } from 'uxu-utils';
import { ContentPartTypeEnum, createSlug } from 'uxu-utils';
import { createSlugForType } from '../../function';
import { parserDataImg } from '../parserDataImg';
import { GetDataTypes } from './utils.parser.parserDataFromApiGetArticleToArticleData.types';

export class ParserDataFromApiGetArticleToArticleData {
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

  parserDataForArticle ( content?: GetArticleQuery ) {
    if ( !content ) return null;
    this.data = {
      pageID: 'wtrasie',
      id: content?.article?.data.id || null,
      type: content?.article?.data.attributes.type || null,
      title: content?.article?.data?.attributes?.title || null,
      lead: content?.article?.data?.attributes?.lead?.lead || null,
      createdAt: content?.article?.data?.attributes?.createdAt || null,
      canonicalURL: this.canonicalURL || null,
      cover: {
        src: parserDataImg({attributes: content?.article?.data?.attributes?.cover?.data?.attributes || null, typeImg: 'medium' }),
        caption: content?.article?.data?.attributes?.cover?.data?.attributes?.caption || null,
        alt: content?.article?.data?.attributes?.cover?.data?.attributes?.alternativeText || null,
      },
      author: {
        name: content?.article?.data?.attributes?.author?.data?.attributes?.username || null,
        avatar: {
          src: parserDataImg({attributes: content?.article?.data?.attributes?.author?.data?.attributes?.avatar?.data?.attributes || null , typeImg: 'thumbnail' }),
          caption: content?.article?.data?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.caption || null,
          alt: content?.article?.data?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText || null,
        },
      },
      tags:
        content?.article?.data?.attributes.tags?.data?.map ( tag => ({
          title: tag?.attributes?.title || null,
          slug: `${createSlugForType ( 'tag' )}/${tag.id}/${createSlug ( tag?.attributes?.title || null )}`,
        }) ) || [],
      stats: {ratings: 0, comments: 0, views: 0},

      contentparts: content?.article?.data?.attributes?.contentparts?.map ( ( content, i ) => {
        const data = {
          id: `${i}`,
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

            content?.media?.data?.attributes?.url && (data[ 'src' ] = parserDataImg({attributes: content?.media?.data?.attributes || null , typeImg: 'medium' }));
            content?.media?.data?.attributes?.caption && (data[ 'caption' ] = content?.media?.data?.attributes?.caption || null);
            content?.media?.data?.attributes?.alternativeText && (data[ 'alt' ] = content?.media?.data?.attributes?.alternativeText || null);
            break;
        }

        return data;
      } ),
    };
  }

  getData (): GetDataTypes {
    this.parserDataForArticle ( this?.getArticleData );

    return {
      data: this?.data,
      isLoading: this?.isLoading,
    };
  }
}
