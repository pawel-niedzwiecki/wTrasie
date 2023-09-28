import { useQuery } from '@apollo/client';
import { GetSearchQuery, GET_SEARCH } from "gql";
import { adapterSearchData } from 'utils';
import { SearchSuggestionContentDetails } from 'uxu-utils/libs/design-system/src/lib/components/organisms/searchEngine/searchEngineInModal/types';

export function useSearch() {
  const { refetch } = useQuery<GetSearchQuery>(GET_SEARCH, { skip: true });

  const onSearchQuery = async (searchQuery: string): Promise<{ searchResults: SearchSuggestionContentDetails[] }> => {
    const { data } = await refetch({ query: searchQuery });
    return { searchResults: adapterSearchData(data) };
  };

  return onSearchQuery;
}
