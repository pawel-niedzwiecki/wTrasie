import { APOLLO_CLIENT } from 'config';
import { GET_ARICLE, GET_ARICLES } from './../query';
import { GetArticleQuery, GetArticlesQuery } from './../types';

export async function clientGetArticlesQuery(baseVariables: {
  pageSize: number;
  page: number;
  type: Array<"article" | "service">
}) {
  const options = {query: GET_ARICLES, variables: baseVariables};

  return APOLLO_CLIENT.query<GetArticlesQuery>(options);
}

export async function clientGetArticleQuery ( baseVariables: { id: number } ) {
  const options = {query: GET_ARICLE, variables: baseVariables};

  return APOLLO_CLIENT.query<GetArticleQuery>(options);
}
