import { Layout } from 'layout';
import { client } from 'config';
import { NextSeoProps } from 'next-seo';
import { createSlugForType } from 'utils';
import type { FRAGMENT_ARTICLES_META, FRAGMENT_ARTICLES_TYPE, GET_SETTING_PAGE_TYPE } from 'gql';
import {
  GET_ARICLES_META_FILTRTYPE_TYPE,
  GET_ARICLES_META_FILTRTYPETAG_TYPE,
  GET_LIST_ARICLES,
  GET_SETTING_PAGE,
} from 'gql';

import type {
  SpecialProps as SiteBarType,
} from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/component.siteBar.props';
import { createSlug, ListingArticles } from 'uxu-utils';


type Props = {
  seo: NextSeoProps,
  siteBar: SiteBarType,
  articles: any
}

export function Index({ siteBar, seo, articles }: Props) {
  return (
    <Layout siteBar={siteBar} seo={seo}>
      <ListingArticles data={articles} isLoading={false} />
    </Layout>
  );
}


export async function getStaticProps() {
  const data = {
    seo: {},
    articles: {},
    siteBar: {
      filter: {
        isLoading: false,
        links: [],
      },
      socialMedia: { isLoading: false, list: [] },
    },
  };

  const queryListArticles = await client.query<{ articles: FRAGMENT_ARTICLES_TYPE }>({
    query: GET_LIST_ARICLES,
    variables: { page: 1 },
  });

  data.articles = queryListArticles?.data?.articles?.data ? queryListArticles?.data?.articles?.data.map((art) => ({
    content: {
      title: art.attributes.title,
      slug: `${createSlugForType(art.attributes.type)}/${createSlug(art.attributes.title)}`,
      createdAt: art.attributes.createdAt,
      author: {
        name: art.attributes?.author.data.attributes.username || 'autor',
        avatar: {
          src: art.attributes?.author.data.attributes.avatar.data.attributes.formats.thumbnail.url,
          alt: art.attributes?.author.data.attributes.avatar.data.attributes.alternativeText,
        },
      },
      cover: {
        src: art?.attributes?.cover?.data?.attributes?.formats?.large?.url || null,
        alt: art?.attributes?.cover?.data?.attributes?.alternativeText || null,
      },
      tags: art?.attributes?.tags?.data?.map((tag) => ({
        title: tag.attributes.title,
        slug: `${createSlugForType(`tag`)}/${createSlug(tag.attributes.title)}`,
      })) || [],
      stats: { ratings: 0, comments: 0, views: 0 },
    },
  })) : [];


  const querySettings = await client.query<GET_SETTING_PAGE_TYPE>({
    query: GET_SETTING_PAGE,
    variables: { page: 'home' },
  });

  const attributes = querySettings?.data?.setting?.data?.attributes;
  data.seo = { ...attributes?.settingsPages[0]?.seo };
  data.siteBar.socialMedia.list = attributes?.socialMedia?.map((item) => ({ typ: item.typ, url: item.url }));

  const filter = attributes?.settingsPages[0]?.filter;
  if (filter) {
    for (const filtr of filter) {
      const { slug, title } = filtr;
      const countArticle = await client.query<FRAGMENT_ARTICLES_META>({
        query: slug === '/' ? GET_ARICLES_META_FILTRTYPE_TYPE : GET_ARICLES_META_FILTRTYPETAG_TYPE,
        variables: slug === '/' ? { type: 'article' } : { type: 'article', tag: slug },
        fetchPolicy: 'no-cache',
      });

      const score = countArticle?.data?.articles?.meta?.pagination?.total;

      data?.siteBar?.filter?.links?.push({
        title,
        score,
        active: slug === '/',
        slug: slug === '/' ? slug : createSlugForType('tag') + '' + slug,
        fetchPolicy: 'no-cache',
      });
    }
  }


  return {
    props: { ...data },
  };
}


export default Index;
