import { createSlug } from 'uxu-utils';
import { GetArticlesQuery } from 'gql';
import { createSlugForType } from '../../function';
import { parserDataImg } from '../../parser/parserDataImg';
import { AdapterArticlesData } from './types';
import { DEFAULT_PAGINATION } from './consts';

function parserDataForPagination(pagination?: GetArticlesQuery['articles']['meta']['pagination']) {
  const { page = 1, pageSize = 1, pageCount = 1 } = pagination || {};
  return { page, pageSize, pageCount };
}

function parserDataForListArticles(getArticles: GetArticlesQuery) {
  if (!getArticles?.articles?.data?.length) return [];

  return getArticles?.articles?.data.map(art => ({
    content: {
      id: art?.id,
      title: art?.attributes?.title || null,
      slug: `${createSlugForType(art?.attributes?.type)}/${art?.id}/${createSlug(art?.attributes?.title || null)}`,
      createdAt: art?.attributes?.createdAt || null,
      author: {
        name: art?.attributes?.author?.data?.attributes?.username || null,
        avatar: {
          src: parserDataImg({
            attributes: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes || null,
            typeImg: 'thumbnail',
          }),
          alt: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText || null,
        },
      },
      cover: {
        src: parserDataImg({ attributes: art?.attributes?.cover?.data?.attributes || null, typeImg: 'small' }),
        alt: art?.attributes?.cover?.data?.attributes?.alternativeText || null,
      },
      tags: art?.attributes?.tags?.data?.map(tag => ({
        title: tag?.attributes?.title,
        slug: `${createSlugForType('tag')}/${tag?.id}/${createSlug(tag?.attributes?.title || null)}`,
      })) || [],
      stats: { ratings: 0, comments: 0, views: 0 },
    },
  }));
}

export function adapterArticlesData(getArticles: GetArticlesQuery): AdapterArticlesData {
  const parsedPagination = parserDataForPagination(getArticles?.articles?.meta?.pagination);
  const parsedArticles = parserDataForListArticles(getArticles);

  return {
    data: parsedArticles,
    pagination: { ...DEFAULT_PAGINATION, ...parsedPagination },
  };
}
