import { GetArticleQuery } from 'gql';
import type { PostViewData, Tag } from 'uxu-utils';
import { ContentPartTypeEnum, createSlug } from 'uxu-utils';
import { createSlugForType } from '../../function';
import { adapterImageData } from './../index';
import { GetAdapterArticleData } from './types';

export function adapterArticleData(getArticleData: GetArticleQuery): GetAdapterArticleData {
  const parseImage = (image?: any, typeImg: 'thumbnail' | 'small' | 'medium' | 'large' | 'url' = 'medium' ) => image ? {
    src: adapterImageData({ attributes: image.data?.attributes ?? null, typeImg }),
    caption: image.data?.attributes?.caption ?? null,
    alt: image.data?.attributes?.alternativeText ?? null,
  } : null;

  const parseAuthor = (author?: any) => ({
    title: author?.attributes?.username ?? null,
    avatar: parseImage(author?.attributes?.avatar, 'thumbnail'),
  });

  const parseTag = (tag?: GetArticleQuery['article']['data']['attributes']['tags']['data'][0]): Tag => ({
    id: tag.id,
    title: tag?.attributes?.title ?? null,
    slug: `${createSlugForType('tag')}/${tag.id}/${createSlug(tag?.attributes?.title)}`,
  });

  const parseContentPart = (content: any, i: number) => {
    const data = {
      id: content?.id ?? `${i}`,
      value: null,
      type: null,
    };

    switch(content?.__typename) {
      case 'ComponentContentPartsTxt':
        return { ...data, value: content?.txt, type: ContentPartTypeEnum.PARAGRAPH };
      case 'ComponentContentPartsYoutube':
        return { ...data, url: content?.url, type: ContentPartTypeEnum.EMBEDYOUTUBE };
      case 'ComponentContentPartsQuote':
        return { ...data, value: content?.quote, type: ContentPartTypeEnum.QUOTE };
      case 'ComponentContentPartsMedia':
        if (!content?.media?.data?.attributes?.url) return data;
        return {
          ...data,
          type: ContentPartTypeEnum.IMG,
          src: adapterImageData({ attributes: content?.media?.data?.attributes ?? null, typeImg: 'medium' }),
          caption: content?.media?.data?.attributes?.caption ?? null,
          alt: content?.media?.data?.attributes?.alternativeText ?? null,
        };
      default:
        return data;
    }
  };

  const parserDataForArticle = (getArticleData: GetArticleQuery): PostViewData => {
    if (!getArticleData?.article?.data) return {};

    const { id, attributes } = getArticleData.article.data;

    return {
      id: id ?? '',
      type: attributes?.type ?? '',
      title: attributes?.title ?? '',
      lead: attributes?.lead?.lead ?? '',
      createdAt: attributes?.createdAt ?? new Date(),
      cover: parseImage(attributes?.cover, 'medium'),
      authors: attributes?.authors?.data?.map(parseAuthor) ?? [],
      tags: attributes?.tags?.data?.map(parseTag) ?? [],
      stats: { ratings: 0, comments: 0, views: 0 },
      contentparts: attributes?.contentparts?.map(parseContentPart) ?? [],
    };
  };

  return parserDataForArticle(getArticleData);
}
