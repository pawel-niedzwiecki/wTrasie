import { APOLLO_CLIENT } from 'config';
import { GET_ARICLE, GET_ARICLES } from './../query';
import { GetArticleQuery, GetArticlesQuery } from './../types';

export async function clientGetArticlesQuery({ page, pageSize = 12, type = ['service', 'article']}: {
  page: number;
  pageSize?: number;
  type?: Array<string>;
} ) {
  const options = {query: GET_ARICLES, variables: { page, pageSize, type }};
  return APOLLO_CLIENT.query<GetArticlesQuery> ( options );
}

export async function clientGetArticleQuery ( baseVariables: { id: number } ) {
  const options = {query: GET_ARICLE, variables: baseVariables};

  return APOLLO_CLIENT.query<GetArticleQuery> ( options );
}
