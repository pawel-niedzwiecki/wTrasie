import { LayoutDefault } from 'layout';
import {
  DataForLayout,
  DataForSectionListingArticles,
  ParserDataFromApiGetArticleListToArticlesListData,
  ParserDataFromGetSettingApiToLayoutData
} from '../../utils';
import { clientGetArticlesListQuery, clientGetSettingPageQuery, clientGetTagQuery } from 'gql';
import { SectionListingArticles } from 'uxu-utils';
import { useHookListingArticles } from "../../hooks";

type Props = {
  idTag: number;
  dataForLayout: DataForLayout;
  dataForSectionListingArticlesSSR: DataForSectionListingArticles;
};

export default function Tag ( {idTag, dataForLayout, dataForSectionListingArticlesSSR}: Props ) {

  const {dataClient} = useHookListingArticles ( {
    dataSSR: dataForSectionListingArticlesSSR,
    queryVariables: {pageSize: 12, page: 1, type: ['article', 'service'], idTag: `${idTag}`}
  } )


  return (
    <LayoutDefault {...dataForLayout}>
      <SectionListingArticles dataSSR={dataForSectionListingArticlesSSR} dataClient={dataClient}/>
    </LayoutDefault>
  );
}

export async function getServerSideProps ( context ) {
  const {slug} = context.params;
  const idTag = parseInt ( slug[ 0 ] );

  // set data for SectionListingArticles
  const articlesList = await clientGetArticlesListQuery ( {page: 1, idTag} );
  const dataForSectionListingArticlesSSR: DataForSectionListingArticles = new ParserDataFromApiGetArticleListToArticlesListData ( {getArticlesList: articlesList.data} ).getData ();

  // set data for LayoutDefault
  const getDataTag = await clientGetTagQuery ( {idTag} );
  const querySettings = await clientGetSettingPageQuery ( {page: 'home'} );
  const dataForLayout: DataForLayout = new ParserDataFromGetSettingApiToLayoutData ( {
    data: querySettings.data,
    slug: `${slug[ 0 ]}/${slug[ 1 ]}`,
    seo: {
      title: getDataTag?.data?.tag?.data?.attributes?.seo?.title,
      description: getDataTag?.data?.tag?.data?.attributes?.seo?.description,
      openGraph: {
        url: `https://wtrasie.pl/${slug[ 0 ]}/${slug[ 1 ]}`,
        title: getDataTag?.data?.tag?.data?.attributes?.seo?.title,
        description: getDataTag?.data?.tag?.data?.attributes?.seo?.description,
        type: 'website',
        locale: 'pl',
        images: [{url: getDataTag?.data?.tag?.data?.attributes?.cover?.data?.attributes?.url}],
      },
    },
  } ).getData ();

  return {
    // Passed to the page component as props
    props: {dataForLayout, dataForSectionListingArticlesSSR, idTag},
  };
}
