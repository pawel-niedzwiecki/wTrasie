import { FRAGMENT_VIEWS_TYPE, FRAGMENT_TAGS_TYPE } from '.';

export type FRAGMENT_ARTICLES_TYPE = {
  __typename: 'ArticleEntityResponseCollection',
  data: FRAGMENT_ARTICLE_TYPE[]
}

export type FRAGMENT_ARTICLE_TYPE = {
  __typename: 'ArticleEntity', id: string, attributes: FRAGMENT_ATTRIBUTES_ARTICLE_TYPE
}


export type FRAGMENT_ATTRIBUTES_ARTICLE_TYPE = {
  __typename: 'Article',
  title: string,
  tags: FRAGMENT_TAGS_TYPE,
  views?: FRAGMENT_VIEWS_TYPE
}
