import { LayoutDefault } from 'layout';
import {
  DataForLayout,
  DataForSectionListingArticles,
  ParserDataFromApiGetArticleListToArticlesListData,
  ParserApiDataToLayoutData
} from 'utils';
import { SectionListingArticles } from 'uxu-utils';
import { useHookListingArticles } from 'hooks'
import { clientGetArticlesListQuery, clientGetSettingPageQuery } from 'gql';


type Props = {
  dataForLayout: DataForLayout;
  dataForSectionListingArticlesSSR: DataForSectionListingArticles;
};

function Index ( {dataForLayout, dataForSectionListingArticlesSSR}: Props ) {

  const {dataClient} = useHookListingArticles ( {
    dataSSR: dataForSectionListingArticlesSSR,
    queryVariables: {pageSize: 12, page: 1, type: ['article']}
  } )

  return (
    <LayoutDefault {...dataForLayout}>
      <SectionListingArticles dataSSR={dataForSectionListingArticlesSSR} dataClient={dataClient}/>
    </LayoutDefault>
  );
}

export async function getServerSideProps () {
  // set data for LayoutDefault
  const querySettings = await clientGetSettingPageQuery ( {page: 'home'} );
  const dataForLayout: DataForLayout = new ParserApiDataToLayoutData (querySettings.data, '/').getData ();

  // set data for SectionListingArticles
  const articlesList = await clientGetArticlesListQuery ( {page: 1, type: ['article']} );
  const dataForSectionListingArticlesSSR: DataForSectionListingArticles = new ParserDataFromApiGetArticleListToArticlesListData ( {getArticlesList: articlesList.data} ).getData ();

  return {
    props: {dataForSectionListingArticlesSSR, dataForLayout},
  };
}

export default Index;
