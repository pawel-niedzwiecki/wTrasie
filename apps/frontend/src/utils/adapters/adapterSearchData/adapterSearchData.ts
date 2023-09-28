import { GetSearchQuery } from "gql";
import { createSlugForType } from 'utils';
import { createSlug } from 'uxu-utils';
import { SearchSuggestionContentDetails } from 'uxu-utils/libs/design-system/src/lib/components/organisms/searchEngine/searchEngineInModal/types';

export function adapterSearchData(data: GetSearchQuery | undefined): SearchSuggestionContentDetails[] {
  if (!data?.searchResults?.hits) return [];

  return data.searchResults.hits
    .filter(function(post): post is NonNullable<typeof post> {
      return !!post;
    })
    .map(function(post) {
      const slug = post.type && post.title && `${createSlugForType(post.type)}/${createSlug(post.title)}`;
      const type = (post.type === 'article' || post.type === 'service') ? "post" : undefined;
      const { title, lead } = post;

      return {
        slug,
        type,
        title,
        lead: lead?.lead
      } as SearchSuggestionContentDetails;
    })
    .filter(function(item): item is SearchSuggestionContentDetails {
      return !!item.slug && !!item.type && !!item.title;
    });
}
