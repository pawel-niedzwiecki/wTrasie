import { FRAGMENT_AUTHOR_TYPE, FRAGMENT_COVER, FRAGMENT_TAGS_TYPE, FRAGMENT_VIEWS_TYPE } from '../index';

export type FRAGMENT_ARTICLES_TYPE = {
  __typename: string,
  data: FRAGMENT_ARTICLE_TYPE[]
  meta?: FRAGMENT_ARTICLES_META
}

export type FRAGMENT_ARTICLE_TYPE = {
  __typename: string, id: string, attributes: FRAGMENT_ATTRIBUTES_ARTICLE_TYPE
}

export type FRAGMENT_ARTICLE_LEAD_TYPE = {
  __typename: string, id: string, lead: string | null
} | null

export type FRAGMENT_ARTICLES_META = {
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

export type FRAGMENT_ATTRIBUTES_ARTICLE_TYPE = {
  __typename: string,
  createdAt?: Date,
  title: string,
  type: string | null,
  tags: FRAGMENT_TAGS_TYPE,
  views?: FRAGMENT_VIEWS_TYPE,
  lead?: FRAGMENT_ARTICLE_LEAD_TYPE
  cover?: FRAGMENT_COVER

  author?: FRAGMENT_AUTHOR_TYPE
}

