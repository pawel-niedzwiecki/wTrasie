import { Layout } from 'layout';
import { client } from 'config';
import { NextSeoProps } from 'next-seo';
import { createSlugForType } from 'utils';
import type { FRAGMENT_ARTICLES_META, GET_SETTING_PAGE_TYPE } from 'gql';
import { GET_ARICLES_META, GET_SETTING_PAGE } from 'gql';
import type {
  SpecialProps as SiteBarType,
} from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/component.siteBar.props';


type Props = {
  seo: NextSeoProps,
  siteBar: SiteBarType,
}

export function Index<Props>({ siteBar, seo }) {
  return (
    <Layout siteBar={siteBar} seo={seo}>
      <p>UXU</p>
    </Layout>
  );
}


export async function getStaticProps() {
  const data = {
    seo: {},
    siteBar: {
      filter: {
        isLoading: false,
        links: [],
      },
      socialMedia: { isLoading: false, list: [] },
    },
  };


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
        query: GET_ARICLES_META,
        variables: { type: 'article', tag: slug === '/' ? '' : slug },
      });

      const score = countArticle?.data?.articles?.meta?.pagination?.total;

      data?.siteBar?.filter?.links?.push({
        title,
        score,
        active: slug === '/',
        slug: slug === '/' ? slug : createSlugForType('tag') + '/' + slug,
      });
    }
  }


  return {
    props: { ...data },
  };
}


export default Index;
