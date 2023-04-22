import { Layout } from 'layout';
import { client } from 'config';
import {
  FRAGMENT_TAG_TYPE,
  FRAGMENT_TAGS_TYPE,
  GET_ARICLES_META_FILTRTYPE_TYPE,
  GET_ARICLES_META_FILTRTYPETAG_TYPE,
  GET_LIST_ARICLES_WITH_TAG,
  GET_LIST_TAGS,
  GET_LISTING_ARTICLES_META_TYPE,
  GET_LISTING_ARTICLES_TYPE,
  GET_SETTING_PAGE,
  GET_SETTING_PAGE_TYPE,
  GET_TAG_DATA,
} from 'gql';
import { ArticleShortDataType, createSlug, SectionListingArticles } from 'uxu-utils';
import { createSlugForType } from '../../utils';
import { NextSeoProps } from 'next-seo';
import type { SpecialProps as SiteBarType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/component.siteBar.props';

export async function getStaticPaths() {
  const queryListTags = await client.query<{ tags: FRAGMENT_TAGS_TYPE }>({
    query: GET_LIST_TAGS,
    variables: { page: 1 },
  });

  return {
    paths: queryListTags?.data?.tags?.data?.map(tag => ({
      params: { slug: `${createSlug(tag.attributes.title)}-${tag.id}` },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const getId = /(\d*)$/.exec(slug)[0];

  const getDataTag = await client.query<{ tag: FRAGMENT_TAG_TYPE }>({
    query: GET_TAG_DATA,
    variables: { idTag: getId },
  });

  const data = {
    seo: {
      title: getDataTag?.data?.tag?.data?.attributes?.seo.title,
      description: getDataTag?.data?.tag?.data?.attributes?.seo.description,
    },
    articles: {},
    siteBar: {
      filter: {
        isLoading: false,
        links: [],
      },
      socialMedia: { isLoading: false, list: [] },
    },
  };

  const getListArticles = await client.query<{ articles: GET_LISTING_ARTICLES_TYPE }>({
    query: GET_LIST_ARICLES_WITH_TAG,
    variables: { page: 1, idTag: getId },
  });

  data.articles = getListArticles?.data?.articles?.data
    ? getListArticles?.data?.articles?.data.map(art => ({
        content: {
          id: art.id,
          title: art.attributes.title,
          slug: `${createSlugForType(art.attributes.type)}/${createSlug(art.attributes.title)}-${art.id}`,
          createdAt: art.attributes.createdAt,
          author: {
            name: art.attributes?.author.data.attributes.username || 'autor',
            avatar: {
              src: art.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.formats?.thumbnail?.url || null,
              alt: art.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText,
            },
          },
          cover: {
            src: art?.attributes?.cover?.data?.attributes?.formats?.medium?.url || null,
            alt: art?.attributes?.cover?.data?.attributes?.alternativeText || null,
          },
          tags:
            art?.attributes?.tags?.data?.map(tag => ({
              title: tag.attributes.title,
              slug: `${createSlugForType(`tag`)}/${createSlug(tag.attributes.title)}-${tag.id}`,
            })) || [],
          stats: { ratings: 0, comments: 0, views: 0 },
        },
      }))
    : [];

  const querySettings = await client.query<GET_SETTING_PAGE_TYPE>({
    query: GET_SETTING_PAGE,
    variables: { page: 'home' },
  });

  const attributes = querySettings?.data?.setting?.data?.attributes;
  data.siteBar.socialMedia.list = attributes?.socialMedia?.map(item => ({ typ: item.typ, url: item.url }));

  const filter = attributes?.settingsPages[0]?.filter;
  if (filter) {
    for (const filtr of filter) {
      const { key, slug, title } = filtr;
      const countArticle = await client.query<GET_LISTING_ARTICLES_META_TYPE>({
        query: slug === '/' ? GET_ARICLES_META_FILTRTYPE_TYPE : GET_ARICLES_META_FILTRTYPETAG_TYPE,
        variables: slug === '/' ? { type: 'article' } : { type: 'article', tag: slug },
        fetchPolicy: 'no-cache',
      });

      const score = countArticle?.data?.articles?.meta?.pagination?.total;

      score &&
        data?.siteBar?.filter?.links?.push({
          title,
          score,
          active: slug === '/',
          slug: slug === '/' ? slug : `${createSlugForType('tag')}/${slug}${key ? `-${key}` : ''}`,
          fetchPolicy: 'no-cache',
        });
    }
  }

  return {
    // Passed to the page component as props
    props: { ...data },
  };
}

type Props = {
  seo: NextSeoProps;
  siteBar: SiteBarType;
  articles: ArticleShortDataType[];
};

export default function Tag({ siteBar, seo, articles }: Props) {
  return (
    <Layout seo={seo} siteBar={siteBar}>
      <SectionListingArticles data={articles} isLoading={false} />
    </Layout>
  );
}
