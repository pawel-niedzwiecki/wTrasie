import { GET_TAG, GET_TAGS_LIST } from './../query';
import { GetTagQuery, GetTagsListQuery } from './../types';
import { APOLLO_CLIENT } from 'config';

export async function clientGetTagQuery(baseVariables: { idTag: number }) {
  const options = { query: GET_TAG, variables: baseVariables };
  return APOLLO_CLIENT.query<GetTagQuery>(options);
}

export async function clientGetTagListQuery({ page = 1, pageSize = 12 }: { page?: number; pageSize?: number }) {
  const options = { query: GET_TAGS_LIST, variables: { page, pageSize } };
  return APOLLO_CLIENT.query<GetTagsListQuery>(options);
}
