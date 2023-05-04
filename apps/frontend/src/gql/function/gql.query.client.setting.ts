import { GET_SETTING_PAGE } from './../query';
import { GetSettingPageQuery } from './../types';
import { client } from 'config';

export async function clientGetSettingPageQuery(baseVariables: { page: 'home' }) {
  const options = { query: GET_SETTING_PAGE, variables: baseVariables };
  return client.query<GetSettingPageQuery>(options);
}
