import { LayoutDefault } from 'layout';
import { NextSeoProps } from 'next-seo';
import { ParserDataFromApiGetArticleListToArticlesListData, ParserDataFromGetSettingApiToLayoutDefaultData } from 'utils';
import type { ArticleShortDataType } from 'uxu-utils';
import { SectionListingArticles } from 'uxu-utils';
import { clientGetArticlesListQuery, clientGetSettingPageQuery } from 'gql';
import type { SpecialProps as SiteBarPrimaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import type { SpecialProps as SiteBarSecondaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';
import type { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';

type DataForLayoutDefaultTypes = {
  seo: NextSeoProps;
  dataFooter: FooterDataType;
  siteBarPrimary: SiteBarPrimaryType;
  siteBarSecondary: SiteBarSecondaryType;
};

type DataForSectionListingArticlesTypes = {
  isLoading: boolean;
  data: ArticleShortDataType[];
};

type Props = {
  dataForLayoutDefault: DataForLayoutDefaultTypes;
  dataForSectionListingArticles: DataForSectionListingArticlesTypes;
};

function Index({ dataForLayoutDefault, dataForSectionListingArticles }: Props) {
  return (
    <LayoutDefault {...dataForLayoutDefault}>
      <SectionListingArticles {...dataForSectionListingArticles} />
    </LayoutDefault>
  );
}

export async function getStaticProps() {
  // set data for LayoutDefault
  const querySettings = await clientGetSettingPageQuery({ page: 'home' });
  const dataForLayoutDefault: DataForLayoutDefaultTypes = new ParserDataFromGetSettingApiToLayoutDefaultData({
    data: querySettings.data,
    slug: '/',
  }).getData();

  // set data for SectionListingArticles
  const articlesList = await clientGetArticlesListQuery({ page: 1 });
  const dataForSectionListingArticles: DataForSectionListingArticlesTypes = new ParserDataFromApiGetArticleListToArticlesListData({ getArticlesList: articlesList.data }).getData();

  return {
    props: { dataForSectionListingArticles, dataForLayoutDefault },
  };
}

export default Index;
