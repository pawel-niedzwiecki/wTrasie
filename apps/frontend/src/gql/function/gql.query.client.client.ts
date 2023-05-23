import { client } from 'config';
import { GET_CLIENTS_LIST_WITH_FILTRES_SHORTNAME } from './../query';
import { GetClientsListWithFiltresShortNameQuery } from './../types';

export async function clientClientsListWithFiltresShortNameQuery ( baseVariables: { shortname: Array<string> } ) {
  const options = { query: GET_CLIENTS_LIST_WITH_FILTRES_SHORTNAME, variables: baseVariables };
  return client.query<GetClientsListWithFiltresShortNameQuery>(options);
}
