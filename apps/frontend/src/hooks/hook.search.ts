import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SEARCH, GET_SEARCH_TYPE } from 'gql';
import {
  ResData,
} from 'uxu-utils/libs/design-system/src/lib/components/organisms/form/search/component.search.types';


const resInitialState: { data: ResData, query: string } = { data: [], query: '' };
import { throttle, createSlug } from 'uxu-utils';
import { createSlugForType } from 'utils';

export const useHookSearch = () => {
  const [res, setRes] = useState(resInitialState);
  const [query, setQuery] = useState('');
  const { loading, data, refetch } = useQuery<GET_SEARCH_TYPE>(GET_SEARCH, { variables: { query: '' } });

  useEffect(() => throttle(() => query.length && refetch({ query }), 400), [query]);

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
