import { APOLLO_CLIENT } from 'config';
import { GET_SEARCH } from './../query';
import { GetSearchQuery } from './../types';

export async function clientGetSearchQuery(baseVariables: { query: string }) {
  const options = { query: GET_SEARCH, variables: baseVariables };
  return APOLLO_CLIENT.query<GetSearchQuery>(options);
}
