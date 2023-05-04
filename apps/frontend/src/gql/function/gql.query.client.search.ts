import { client } from 'config';
import { GET_SEARCH } from './../query';
import { GetSearchQuery } from './../types';

export async function clientGetSearchQuery(baseVariables: { query: string }) {
  const options = { query: GET_SEARCH, variables: baseVariables };
  return client.query<GetSearchQuery>(options);
}
