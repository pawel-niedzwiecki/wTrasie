import { Layout } from 'layout';
import { NextSeoProps } from 'next-seo';
import { client } from '../../config';
import type { ArticleDataType } from 'uxu-utils';
import { createSlug, SectionArticleFull } from 'uxu-utils';
import { createSlugForType } from 'utils';
import {
  GET_ARICLE_BY_ID,
  GET_ARICLES_META_FILTRTYPE_TYPE,
  GET_ARICLES_META_FILTRTYPETAG_TYPE,
  GET_ARTICLE_BY_ID_TYPE,
  GET_LIST_ARICLES,
  GET_LISTING_ARTICLES_META_TYPE,
  GET_LISTING_ARTICLES_TYPE,
  GET_SETTING_PAGE,
  GET_SETTING_PAGE_TYPE,
} from '../../gql';
import type {
  SpecialProps as SiteBarType,
} from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/component.siteBar.props';

type Props = {
  seo: NextSeoProps
  siteBar: SiteBarType
} & ArticleDataType

export async function getStaticPaths() {

  const queryListArticles = await client.query<{ articles: GET_LISTING_ARTICLES_TYPE }>({
    query: GET_LIST_ARICLES,
    variables: { page: 1 },
  });

  return {
    paths: queryListArticles.data.articles.data.map((article) => ({ params: { slug: `${createSlug(article.attributes.title)}-${article.id}` } })),
    fallback: false,
  };
}


export async function getStaticProps(context) {
  const { slug } = context.params;
  const getId = /(\d*)$/.exec(slug)[0];

  const getDataArticle = await client.query<{ article: GET_ARTICLE_BY_ID_TYPE }>({
    query: GET_ARICLE_BY_ID,
    variables: { id: getId },
  });

  const {
    seo,
    createdAt,
    title,
    cover,
    author,
    tags,
    lead,
    type,
    contentparts,
  } = getDataArticle.data.article.data.attributes;

  const data: Props = {
    seo: { title: seo?.title, description: seo.description },
    siteBar: {
      filter: {
        isLoading: false,
        links: [],
      },
      socialMedia: { isLoading: false, list: [] },
    },
    content: {
      type,
      title,
      lead: lead.lead,
      createdAt,
      cover: {
        src: cover?.data?.attributes?.formats?.large?.url,
        alt: cover?.data?.attributes?.alternativeText,
      },
      author: {
        name: author?.data?.attributes?.username,
        avatar: {
          src: author?.data?.attributes?.avatar?.data?.attributes?.formats?.thumbnail?.url,
          alt: author?.data?.attributes?.avatar?.data?.attributes?.alternativeText,
        },
      },
      tags: tags?.data?.map((tag) => ({
        title: tag.attributes.title,
        slug: `${createSlugForType('tag')}/${createSlug(tag.attributes.title)}-${tag.id}`,
      })) || [],
      stats: { ratings: 0, comments: 0, views: 0 },
      contentparts: contentparts?.map((content) => {

        const data = {
          __typename: '',
        };

        switch (content.__typename) {
          case 'ComponentContentPartsTxt':
            data['__typename'] = 'txt';
            data['content'] = content.txt;
            break;
          case 'ComponentContentPartsQuote':
            data['__typename'] = 'quote';
            data['content'] = content.quote;
            break;
          case 'ComponentContentPartsMedia':
            data['__typename'] = 'img';
            data['src'] = content.media.data.attributes.formats.large.url;
            content?.media?.data?.attributes?.alternativeText && (data['alt'] = content.media.data.attributes.alternativeText);
            break;
        }

        return data;
      }),
    },
  };

  const querySettings = await client.query<GET_SETTING_PAGE_TYPE>({
    query: GET_SETTING_PAGE,
    variables: { page: 'home' },
  });

  const attributes = querySettings?.data?.setting?.data?.attributes;
  data.siteBar.socialMedia.list = attributes?.socialMedia?.map((item) => ({ typ: item.typ, url: item.url }));

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

      score && data?.siteBar?.filter?.links?.push({
        title,
        score,
        active: slug === '/',
        slug: slug === '/' ? slug : `${createSlugForType('tag')}/${slug}${key ? `-${key}` : ''}`,
      });
    }
  }

  return {
    // Passed to the page component as props
    props: { ...data },
  };
}


export default function Slug({ seo, siteBar, content }: Props) {
  return (
    <Layout seo={seo} siteBar={siteBar}>
      <SectionArticleFull data={{ content }} isLoading={false} />
    </Layout>
  );
};
