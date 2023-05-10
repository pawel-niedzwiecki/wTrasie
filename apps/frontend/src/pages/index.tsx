import { LayoutDefault } from 'layout';
import {
  DataForLayout,
  DataForSectionListingArticles,
  ParserDataFromApiGetArticleListToArticlesListData,
  ParserDataFromGetSettingApiToLayoutData
} from 'utils';
import { SectionListingArticles } from 'uxu-utils';
import { clientGetArticlesListQuery, clientGetSettingPageQuery } from 'gql';

type Props = {
  dataForLayout: DataForLayout;
  dataForSectionListingArticles: DataForSectionListingArticles;
};

function Index ( {dataForLayout, dataForSectionListingArticles}: Props ) {
  return (
    <LayoutDefault {...dataForLayout}>
      <SectionListingArticles {...dataForSectionListingArticles} />
    </LayoutDefault>
  );
}

export async function getServerSideProps () {
  // set data for LayoutDefault
  const querySettings = await clientGetSettingPageQuery ( {page: 'home'} );
  const dataForLayout: DataForLayout = new ParserDataFromGetSettingApiToLayoutData ( {
    data: querySettings.data,
    slug: '/',
  } ).getData ();

  // set data for SectionListingArticles
  const articlesList = await clientGetArticlesListQuery ( {page: 1, type: ['article']} );
  const dataForSectionListingArticles: DataForSectionListingArticles = new ParserDataFromApiGetArticleListToArticlesListData ( {getArticlesList: articlesList.data} ).getData ();

  return {
    props: {dataForSectionListingArticles, dataForLayout},
  };
}

export default Index;
