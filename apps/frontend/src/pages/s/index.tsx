import { LayoutDefault } from 'layout';
import {
  DataForLayout,
  DataForSectionListingArticles,
  ParserDataFromApiGetArticleListToArticlesListData,
  ParserApiDataToLayoutData,
} from 'utils';
import { SectionListingArticles } from 'uxu-utils';
import { clientGetArticlesListQuery, clientGetSettingPageQuery } from 'gql';
import { useHookListingArticles } from "../../hooks";

type Props = {
  dataForLayout: DataForLayout;
  dataForSectionListingArticlesSSR: DataForSectionListingArticles;
};

function Index({ dataForLayout, dataForSectionListingArticlesSSR }: Props) {
  const seo = {
    title: 'Usługi - wTrasie',
    description: 'Wszystko to co potrzebujesz w trasie, aby bezpiecznie dotrzeć do celu.',
  };

  const { dataClient } = useHookListingArticles({
    dataSSR: dataForSectionListingArticlesSSR,
    queryVariables: { pageSize: 12, page: 1, type: ['service'] }
  });

  return (
    <LayoutDefault {...dataForLayout} seo={seo}>
      <SectionListingArticles dataSSR={dataForSectionListingArticlesSSR} dataClient={dataClient} />
    </LayoutDefault>
  );
}

export async function getServerSideProps() {
  // set data for LayoutDefault
  const querySettings = await clientGetSettingPageQuery({ page: 'home' });
  const dataForLayout: DataForLayout = new ParserApiDataToLayoutData(querySettings.data, '/s').getData();

  // set data for SectionListingArticles
  const articlesList = await clientGetArticlesListQuery({ page: 1, type: ['service'] });
  const dataForSectionListingArticlesSSR: DataForSectionListingArticles = new ParserDataFromApiGetArticleListToArticlesListData({
    getArticlesList: articlesList.data
  }).getData();

  return {
    props: { dataForSectionListingArticlesSSR, dataForLayout },
  };
}

export default Index;
