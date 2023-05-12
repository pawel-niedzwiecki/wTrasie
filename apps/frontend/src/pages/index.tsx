import { LayoutDefault } from 'layout';
import {
  DataForLayout,
  DataForSectionListingArticles,
  ParserDataFromApiGetArticleListToArticlesListData,
  ParserDataFromGetSettingApiToLayoutData
} from 'utils';
import { SectionListingArticles } from 'uxu-utils';

import { clientGetArticlesListQuery, clientGetSettingPageQuery, useGetArticlesListQuery } from 'gql';
import { useEffect, useState } from "react";

type Props = {
  dataForLayout: DataForLayout;
  dataForSectionListingArticles: DataForSectionListingArticles;
};

function Index ( {dataForLayout, dataForSectionListingArticles}: Props ) {
  const [nextPage, setNextPage] = useState ( {
    page: 1,
    pageSize: 12,
    pageCount: 1,
    loadingNextPage: false,
    callBack: ( page ) => console.log ( page )
  } )

  const {loading, data, fetchMore} = useGetArticlesListQuery ( {
    variables: {
      page: 1,
      pageSize: 12,
      type: ['article']
    }
  } );

  useEffect ( () => {
    console.log(data)
    const pagination = data?.articles?.meta?.pagination;
    // console.log ( loading, 'loading' )
    // console.log ( pagination , 'pagination')
    pagination && setNextPage ( {
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || 12,
      pageCount: pagination?.pageCount || 1,
      loadingNextPage: loading,
      callBack: ( page ) => {
        fetchMore ( {variables: {page: page, pageSize: 12, type: ['article']}} ).then((data) => {
          console.log(data, 'fetchMore ( {variables: {page: page, pageSize: 12, type: [\'article\']}} )')
        })
      }
    } )

  }, [loading, data] )


  // console.log(data, 'nextPage index data');
  // console.log (nextPage, 'nextPage index page');


  return (
    <LayoutDefault {...dataForLayout}>
      <SectionListingArticles {...dataForSectionListingArticles} nextPage={nextPage}/>
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
