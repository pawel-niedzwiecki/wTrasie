import { client } from 'config';
import { GET_ARICLE, GET_ARICLES_LIST } from './../query';
import { GetArticleQuery, GetArticlesListQuery } from './../types';

export async function clientGetArticlesListQuery ( {page, pageSize = 12, type = ['service', 'article'], idTag}: {
  page: number;
  pageSize?: number;
  type?: Array<string>;
  idTag?: number
} ) {
  const options = {query: GET_ARICLES_LIST, variables: {page, pageSize, type, idTag}};
  return client.query<GetArticlesListQuery> ( options );
}

export async function clientGetArticleQuery ( baseVariables: { id: number } ) {
  const options = {query: GET_ARICLE, variables: baseVariables};

  return client.query<GetArticleQuery> ( options );
}
