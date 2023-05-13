import { LayoutDefault } from 'layout';
import {
  DataForLayout,
  DataForSectionListingArticles,
  ParserDataFromApiGetArticleListToArticlesListData,
  ParserDataFromGetSettingApiToLayoutData
} from 'utils';
import { SectionListingArticles } from 'uxu-utils';
import { clientGetArticlesListQuery, clientGetSettingPageQuery } from 'gql';
import { useHookListingArticles } from "../../hooks";

type Props = {
  dataForLayout: DataForLayout;
  dataForSectionListingArticlesSSR: DataForSectionListingArticles;
};

function Index ( {dataForLayout, dataForSectionListingArticlesSSR}: Props ) {

  const {dataClient} = useHookListingArticles ( {
    dataSSR: dataForSectionListingArticlesSSR,
    queryVariables: {pageSize: 12, page: 1, type: ['service']}
  } )

  return (
    <LayoutDefault {...dataForLayout}>
      <SectionListingArticles dataSSR={dataForSectionListingArticlesSSR} dataClient={dataClient} />
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
  const articlesList = await clientGetArticlesListQuery ( {page: 1, type: ['service']} );
  const dataForSectionListingArticlesSSR: DataForSectionListingArticles = new ParserDataFromApiGetArticleListToArticlesListData ( {getArticlesList: articlesList.data} ).getData ();

  return {
    props: {dataForSectionListingArticlesSSR, dataForLayout},
  };
}

export default Index;
