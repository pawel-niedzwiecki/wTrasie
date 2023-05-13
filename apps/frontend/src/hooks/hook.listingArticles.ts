import { useEffect, useState } from 'react';
import { useGetArticlesListQuery } from 'gql';
import {
  DataForSectionListingArticles,
  ParserDataFromApiGetArticleListToArticlesListData
} from 'utils';


type UseHookListingArticlesProps = {
  dataSSR: DataForSectionListingArticles
  queryVariables: {
    page: number;
    idTag?: string;
    pageSize: number;
    type: Array<('article' | 'service')>
  }
}

export const useHookListingArticles = ( {dataSSR, queryVariables}: UseHookListingArticlesProps ) => {
  const {page, pageSize, pageCount} = dataSSR.pagination;
  const [dataClient, setDataClient] = useState ( dataSSR );
  const {loading, data, fetchMore} = useGetArticlesListQuery ( {
    variables: queryVariables
  } );

  const [pagination, setPagination] = useState ( {
    page,
    pageSize,
    pageCount,
    loadingNextPage: loading,
    callBack: ( page ) => fetchMore ( {variables: {...queryVariables, page}} )
  } )

  useEffect ( () => {
    const page = data?.articles?.meta?.pagination?.page
    pagination && setPagination ( {
      page,
      pageSize,
      pageCount,
      loadingNextPage: loading,
      callBack: ( page ) => fetchMore ( {variables: {...queryVariables, page}} )
    } )

    const parseDataClient: DataForSectionListingArticles = new ParserDataFromApiGetArticleListToArticlesListData ( {getArticlesList: data, pagination} ).getData ();
    parseDataClient.data.splice(0, pageSize)
    setDataClient(parseDataClient)

  }, [loading, data, fetchMore] )

  return {dataClient};
};
