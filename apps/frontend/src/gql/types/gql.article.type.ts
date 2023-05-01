import {
  FRAGMENT_AUTHOR_TYPE,
  FRAGMENT_CONTENTPARTS_TYPE,
  FRAGMENT_COVER,
  FRAGMENT_LEAD_TYPE,
  FRAGMENT_SEO_TYPE,
  FRAGMENT_TAGS_TYPE,
  FRAGMENT_VIEWS_TYPE,
} from '../index';

export type GET_LISTING_ARTICLES_TYPE = {
  __typename: string,
  data: GET_LISTING_ARTICLES_DATA_TYPE[]
  meta?: GET_LISTING_ARTICLES_META_TYPE
}

export type GET_LISTING_ARTICLES_DATA_TYPE = {
  __typename: string, id: string, attributes: GET_LISTING_ARTICLES_ATTRIBUTES_TYPE
}


export type GET_LISTING_ARTICLES_META_TYPE = {
  articles: {
    meta: {
      '__typename': string,
      pagination: {
        page: number | null,
        total: number | null,
        pageSize: number | null,
        pageCount: number | null
        '__typename': string
      } | null
    } | null
  } | null
}

export type GET_LISTING_ARTICLES_ATTRIBUTES_TYPE = {
  __typename: string,
  createdAt?: Date,
  title: string,
  type: string | null,
  tags: FRAGMENT_TAGS_TYPE,
  views?: FRAGMENT_VIEWS_TYPE,
  lead?: FRAGMENT_LEAD_TYPE
  cover?: FRAGMENT_COVER

  author?: FRAGMENT_AUTHOR_TYPE
}

export type GET_ARTICLE_BY_ID_TYPE = {
  __typename: string,
  data: GET_ARTICLE_BY_ID_DATA_TYPE
}

export type GET_ARTICLE_BY_ID_DATA_TYPE = {
  __typename: string, id: string, attributes: GET_ARTICLE_BY_ID_ATTRIBUTES_TYPE
}


export type GET_ARTICLE_BY_ID_ATTRIBUTES_TYPE = {
  __typename: string,
  seo: FRAGMENT_SEO_TYPE,
  id: string,
  createdAt?: Date,
  title: string,
  type: string,
  tags: FRAGMENT_TAGS_TYPE,
  views?: FRAGMENT_VIEWS_TYPE,
  lead: FRAGMENT_LEAD_TYPE,
  cover?: FRAGMENT_COVER,
  author?: FRAGMENT_AUTHOR_TYPE
  contentparts: FRAGMENT_CONTENTPARTS_TYPE
}
