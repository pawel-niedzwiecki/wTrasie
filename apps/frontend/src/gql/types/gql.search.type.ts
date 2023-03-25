import { FRAGMENT_ARTICLES_TYPE } from '../index';


export type GET_SEARCH_TYPE = {
  search: {
    __typename: 'SearchResponse',
    articles: FRAGMENT_ARTICLES_TYPE
  }
}
