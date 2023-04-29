import { LayoutDefault } from 'layout';
import { client } from '../../config';
import { GET_ARICLES_META_FILTRTYPE_TYPE, GET_ARICLES_META_FILTRTYPETAG_TYPE, GET_LISTING_ARTICLES_META_TYPE, GET_SEARCH, GET_SEARCH_TYPE, GET_SETTING_PAGE, GET_SETTING_PAGE_TYPE } from '../../gql';
import { createSlugForType } from '../../utils';
import { NextSeoProps } from 'next-seo';
import { ArticleShortDataType, createSlug, SectionListingArticles } from 'uxu-utils';
import type { SpecialProps as SiteBarPrimaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import type { SpecialProps as SiteBarSecondaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';
import { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';

export async function getServerSideProps(context) {
  const { search } = context.query;
  const data = {
    seo: { title: `Wyniki wyszukiwania dla ${search} - wTrasie.pl` },
    dataFooter: { columns: [] },
    siteBarPrimary: {
      filter: {
        isLoading: false,
        links: [],
      },

      socialMedia: { isLoading: false, list: [] },
    },
    siteBarSecondary: {
      ads: true,
    },
    search: [],
  };

  const searchType = await client.query<GET_SEARCH_TYPE>({
    query: GET_SEARCH,
    variables: { query: search },
  });

  data.search = searchType?.data?.search?.articles?.data
    ? searchType?.data?.search?.articles?.data?.map(art => ({
        content: {
          id: art.id,
          title: art.attributes.title,
          slug: `${createSlugForType(art.attributes.type)}/${createSlug(art.attributes.title)}-${art.id}`,
          createdAt: art.attributes.createdAt,
          author: {
            name: art.attributes?.author.data.attributes.username || 'autor',
            avatar: {
              src: art.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.formats?.thumbnail?.url || undefined,
              alt: art.attributes?.author.data.attributes.avatar.data.attributes.alternativeText,
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

  data.dataFooter.columns = attributes.footer.map(column => ({
    id: column.id,
    header: column?.header || '',
    link: column.link.map(data => ({ id: data.id, title: data.title, url: data.url })),
  }));

  data.siteBarPrimary.socialMedia.list = attributes?.socialMedia?.map(item => ({ typ: item.typ, url: item.url }));

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
        data?.siteBarPrimary?.filter?.links?.push({
          title,
          score,
          active: slug === '/',
          slug: slug === '/' ? slug : `${createSlugForType('tag')}/${slug}${key ? `-${key}` : ''}`,
        });
    }
  }

  return {
    props: { ...data }, // will be passed to the page component as props
  };
}

type Props = {
  seo: NextSeoProps;
  dataFooter: FooterDataType;
  siteBarPrimary: SiteBarPrimaryType;
  siteBarSecondary: SiteBarSecondaryType;
  search: ArticleShortDataType[];
};

export default function Search({ seo, dataFooter, siteBarPrimary, siteBarSecondary, search }: Props) {
  return (
    <LayoutDefault seo={seo} siteBarPrimary={siteBarPrimary} siteBarSecondary={siteBarSecondary} dataFooter={dataFooter}>
      <SectionListingArticles data={search} isLoading={false} />
    </LayoutDefault>
  );
}
