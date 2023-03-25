import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import type { GET_SEARCH_TYPE } from 'gql';
import { GET_SEARCH } from 'gql';
import { ResData } from 'uxu-utils/libs/design-system/src/lib/components/organisms/form/search/component.search.types';
import { createSlug, Throttle } from 'uxu-utils';
import { createSlugForType } from 'utils';


const resInitialState: { data: ResData, query: string } = { data: [], query: '' };

export const useHookSearch = () => {
  const [res, setRes] = useState(resInitialState);
  const [query, setQuery] = useState('');
  const throttle = new Throttle({ wait: 100 });
  const { loading, data, refetch } = useQuery<GET_SEARCH_TYPE>(GET_SEARCH, { variables: { query: '' } });

  useEffect(() => throttle.setLastTimeOut(() => query?.length && refetch({ query })), [query]);
  useEffect(() => {
    if (query?.length && data?.search?.articles?.data?.length) {
      const resData = data?.search?.articles?.data.map((art) => {
        const {
          title,
          type,
          lead: { lead },
          cover: { data: { attributes: { formats: { thumbnail: { url } } } } },
        } = art.attributes;

        return {
          cover: url,
          title: title,
          excerpt: lead,
          slug: `/${createSlugForType(type)}/${createSlug(title)}`,
        };
      });
      setRes({ data: resData, query });
    } else res !== resInitialState && setRes(resInitialState);
  }, [data, query]);


  return { setQuery, res, loading };
};
