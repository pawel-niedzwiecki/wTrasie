import { LayoutDefault } from 'layout';
import { clientGetSearchQuery, clientGetSettingPageQuery } from 'gql';
import type { DataForLayout, DataForSectionListingArticles } from 'utils';
import { ParserDataFromApiGetSearchToArticlesListData, ParserDataFromGetSettingApiToLayoutData } from 'utils';
import { SectionListingArticles } from 'uxu-utils';

type Props = {
  dataForLayout: DataForLayout;
  dataForSectionListingArticlesSSR: DataForSectionListingArticles;
};

export default function Search({ dataForLayout, dataForSectionListingArticlesSSR }: Props) {
  return (
    <LayoutDefault {...dataForLayout}>
      <SectionListingArticles dataSSR={dataForSectionListingArticlesSSR} dataClient={dataForSectionListingArticlesSSR} />
    </LayoutDefault>
  );
}

export async function getServerSideProps(context) {
  const { search } = context.query;

  // set data for SectionListingArticles
  const getSearchQueryData = await clientGetSearchQuery({ query: search });
  const dataForSectionListingArticlesSSR: DataForSectionListingArticles = new ParserDataFromApiGetSearchToArticlesListData({ getSearchQuery: getSearchQueryData.data }).getData();

  // set data for LayoutDefault
  const querySettings = await clientGetSettingPageQuery({ page: 'home' });
  const dataForLayout: DataForLayout = new ParserDataFromGetSettingApiToLayoutData({
    data: querySettings.data,
    slug: `/search/${search}`,
    seo: { title: `Wyniki wyszukiwania dla ${search} - wTrasie.pl` },
  }).getData();

  return {
    props: { dataForLayout, dataForSectionListingArticlesSSR },
  };
}
