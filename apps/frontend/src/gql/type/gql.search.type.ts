import type { GET_LISTING_ARTICLES_TYPE } from '../index';


export type GET_SEARCH_TYPE = {
  search: {
    __typename: 'SearchResponse',
    query: string,
    articles: GET_LISTING_ARTICLES_TYPE
  }
}
