import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SEARCH } from '../gql';


export const useHookSearch = () => {
  const [query, setQuery] = useState('');
  const [res, setRes] = useState({ data: [], query });
  const { loading, error, data, refetch } = useQuery(GET_SEARCH, { variables: { query: '' } });

  useEffect(() => {
    refetch({ query });
  }, [query]);

  console.log(data?.search?.articles?.data);
  console.log(query);

  return { setQuery };
};
