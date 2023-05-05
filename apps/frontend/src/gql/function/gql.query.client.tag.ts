import { GET_TAG, GET_TAGS_LIST } from './../query';
import { GetTagQuery, GetTagsListQuery } from './../types';
import { client } from 'config';

export async function clientGetTagQuery(baseVariables: { idTag: number }) {
  const options = { query: GET_TAG, variables: baseVariables };
  return client.query<GetTagQuery>(options);
}

export async function clientGetTagListQuery({ page = 1, pageSize = 12 }: { page?: number; pageSize?: number }) {
  const options = { query: GET_TAGS_LIST, variables: { page, pageSize } };
  return client.query<GetTagsListQuery>(options);
}
