import { client } from 'config';
import { GET_ARICLE, GET_ARICLES_LIST, GET_ARICLES_LIST_WITH_TAG } from './../query';
import { GetArticleQuery, GetArticlesListQuery, GetArticlesListWithTagQuery } from './../types';

export async function clientGetArticlesListQuery({ page, pageSize = 12, type = ['service', 'article'] }: { page: number; pageSize?: number; type?: Array<string> }) {
  const options = { query: GET_ARICLES_LIST, variables: { page, pageSize, type } };
  return client.query<GetArticlesListQuery>(options);
}

export async function clientGetArticlesListWithTagQuery(baseVariables: { page: number; idTag: number }) {
  const options = { query: GET_ARICLES_LIST_WITH_TAG, variables: baseVariables };
  return client.query<GetArticlesListWithTagQuery>(options);
}

export async function clientGetArticleQuery(baseVariables: { id: number }) {
  const options = { query: GET_ARICLE, variables: baseVariables };
  return client.query<GetArticleQuery>(options);
}
