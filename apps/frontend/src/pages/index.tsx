import { Header } from '@uxu-utils';
import { useQuery } from '@apollo/client';
import { GET_SEARCH } from 'gql';
import { GitBranch, GitHub } from 'react-feather';

export function Index() {
  const { loading, error, data } = useQuery(GET_SEARCH, { variables: { query: 'testy' } });
  console.log(data);
  return (
    <>
      <Header
        res={{ data: [], query: '' }}
        tabs={[
          { title: 'GitLab', value: 'https://www.uxu.pl', active: true },
          { title: 'GitHub', value: () => alert('UXU'), icon: <GitHub />, active: false },
          { title: 'Bitbucket', value: 'https://www.uxu.pl', icon: <GitBranch />, active: false },
        ]}
        callBack={(search: string) => {
          console.log({ query: search });
        }}
      />
    </>
  )
    ;
}

export default Index;
