import { GET_SETTING_PAGE } from './../query';
import { GetSettingPageQuery } from './../types';
import { APOLLO_CLIENT } from 'config';

export async function clientGetSettingPageQuery(baseVariables: { page: 'home' }) {
  const options = { query: GET_SETTING_PAGE, variables: baseVariables };
  return APOLLO_CLIENT.query<GetSettingPageQuery>(options);
}
