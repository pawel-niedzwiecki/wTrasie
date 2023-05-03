import { LayoutWithTwoColumn } from 'layout';
import { NextSeoProps } from 'next-seo';
import type { ArticleDataType } from 'uxu-utils';
import { createSlug, SectionArticleFull } from 'uxu-utils';
import { ParserDataFromApiGetArticleToArticleData, ParserDataFromGetSettingApiToLayoutDefaultData } from 'utils';
import { clientGetArticleQuery, clientGetArticlesListQuery, clientGetSettingPageQuery } from 'gql';
import type { SpecialProps as SiteBarPrimaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import type { SpecialProps as SiteBarSecondaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';
import { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';

type DataForLayoutDefaultTypes = {
  seo: NextSeoProps;
  dataFooter: FooterDataType;
  siteBarPrimary: SiteBarPrimaryType;
  siteBarSecondary: SiteBarSecondaryType;
};

type Props = {
  dataForLayoutDefault: DataForLayoutDefaultTypes;
  dataForSectionArticleFull: { data: ArticleDataType; isLoading: boolean; alert?: { title?: string; tel?: string } };
};

export default function Service({ dataForLayoutDefault, dataForSectionArticleFull }: Props) {
  return (
    <LayoutWithTwoColumn {...dataForLayoutDefault}>
      <SectionArticleFull {...dataForSectionArticleFull} />
    </LayoutWithTwoColumn>
  );
}

export async function getStaticPaths() {
  const queryListArticles = await clientGetArticlesListQuery({ page: 1 });

  return {
    paths: queryListArticles.data.articles.data.map(article => ({ params: { slug: `${createSlug(article.attributes.title)}-${article.id}` } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const getId = parseInt(/(\d*)$/.exec(slug)[0]);

  // set data for Article
  const getArticleData = await clientGetArticleQuery({ id: getId });
  const articleData = new ParserDataFromApiGetArticleToArticleData({
    getArticleData: getArticleData.data,
    isLoading: false,
  }).getData();

  // set data for LayoutDefault
  const querySettings = await clientGetSettingPageQuery({ page: 'home' });
  const dataForLayoutDefault: DataForLayoutDefaultTypes = new ParserDataFromGetSettingApiToLayoutDefaultData({
    data: querySettings.data,
    slug: '/',
    seo: {
      title: getArticleData.data.article.data.attributes.seo.title,
      description: getArticleData.data.article.data.attributes.seo.description,
    },
  }).getData();

  return {
    // Passed to the page component as props
    props: { dataForLayoutDefault, dataForSectionArticleFull: { ...articleData } },
  };
}
