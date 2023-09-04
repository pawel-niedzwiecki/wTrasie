import { APOLLO_CLIENT } from 'config';
import { GET_ARICLE, GET_ARICLES_LIST } from './../query';
import { GetArticleQuery, GetArticlesListQuery } from './../types';

export async function clientGetArticlesListQuery ( {page, pageSize = 12, type = ['service', 'article'], idTag}: {
  page: number;
  pageSize?: number;
  type?: Array<string>;
  idTag?: number
} ) {
  const options = {query: GET_ARICLES_LIST, variables: {page, pageSize, type, idTag}};
  return APOLLO_CLIENT.query<GetArticlesListQuery> ( options );
}

export async function clientGetArticleQuery ( baseVariables: { id: number } ) {
  const options = {query: GET_ARICLE, variables: baseVariables};

  return APOLLO_CLIENT.query<GetArticleQuery> ( options );
}
