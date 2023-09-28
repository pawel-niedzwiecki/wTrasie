import { createSlug } from 'uxu-utils';
import { GetArticlesQuery } from 'gql';
import { createSlugForType } from '../../function';
import { adapterImageData } from './../index';
import { AdapterArticlesDataProps } from './types';

function parserDataForListArticles(getArticles: GetArticlesQuery) {
  if (!getArticles?.articles?.data?.length) return [];

  return getArticles?.articles?.data.map(art => ({
      id: art?.id,
      title: art?.attributes?.title || null,
      slug: `${createSlugForType(art?.attributes?.type)}/${art?.id}/${createSlug(art?.attributes?.title || null)}`,
      createdAt: art?.attributes?.createdAt || null,
      authors: art?.attributes?.authors?.data.map((author) => {
        return {
          title: author?.attributes.username || null,
          avatar: {
            src: adapterImageData({
              attributes: author?.attributes?.avatar?.data?.attributes || null,
              typeImg: 'thumbnail',
            }),
            alt: author?.attributes?.avatar?.data?.attributes?.alternativeText || null,
          },
        }
      }),
      cover: {
        src: adapterImageData({ attributes: art?.attributes?.cover?.data?.attributes || null, typeImg: 'small' }),
        alt: art?.attributes?.cover?.data?.attributes?.alternativeText || null,
      },
      stats: { ratings: 0, comments: 0, views: 0 },
  }));
}

export function adapterArticlesData(getArticles: GetArticlesQuery): AdapterArticlesDataProps {
  const parsedArticles = parserDataForListArticles(getArticles);
  return parsedArticles;
}
