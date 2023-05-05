import { client } from 'config';
import { GET_CLIENTS_LIST_WITH_FILTRES_CITY } from './../query';
import { GetClientsListWithFiltresCityQuery } from './../types';

export async function clientClientsListWithFiltresCityQuery(baseVariables: { citys: Array<string> }) {
  const options = { query: GET_CLIENTS_LIST_WITH_FILTRES_CITY, variables: baseVariables };
  return client.query<GetClientsListWithFiltresCityQuery>(options);
}
