import { LayoutDefault } from 'layout';
import { clientGetSearchQuery, clientGetSettingPageQuery } from 'gql';
import { ParserDataFromApiGetSearchToArticlesListData, ParserDataFromGetSettingApiToLayoutDefaultData } from '../../utils';
import { NextSeoProps } from 'next-seo';
import { ArticleShortDataType, SectionListingArticles } from 'uxu-utils';
import type { SpecialProps as SiteBarPrimaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import type { SpecialProps as SiteBarSecondaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';
import { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';

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

export default function Search({ dataForLayoutDefault, dataForSectionListingArticles }: Props) {
  return (
    <LayoutDefault {...dataForLayoutDefault}>
      <SectionListingArticles {...dataForSectionListingArticles} />
    </LayoutDefault>
  );
}

export async function getServerSideProps(context) {
  const { search } = context.query;

  // set data for SectionListingArticles
  const getSearchQueryData = await clientGetSearchQuery({ query: search });
  const dataForSectionListingArticles: DataForSectionListingArticlesTypes = new ParserDataFromApiGetSearchToArticlesListData({ getSearchQuery: getSearchQueryData.data }).getData();

  // set data for LayoutDefault
  const querySettings = await clientGetSettingPageQuery({ page: 'home' });
  const dataForLayoutDefault: DataForLayoutDefaultTypes = new ParserDataFromGetSettingApiToLayoutDefaultData({
    data: querySettings.data,
    slug: '/',
    seo: { title: `Wyniki wyszukiwania dla ${search} - wTrasie.pl` },
  }).getData();

  return {
    props: { dataForLayoutDefault, dataForSectionListingArticles },
  };
}
