import { FRAGMENT_COVER, FRAGMENT_LEAD_TYPE, FRAGMENT_SEO_TYPE } from './';

export type FRAGMENT_TAG_TYPE = {
  __typename: string, data: FRAGMENT_TAG_DATA_TYPE
}

export type FRAGMENT_TAGS_TYPE = {
  __typename: string, data: FRAGMENT_TAG_DATA_TYPE[]
}


export type FRAGMENT_TAG_DATA_TYPE = {
  id: string
  attributes: {
    __typename: string
    title: string
    cover?: FRAGMENT_COVER
    lead?: FRAGMENT_LEAD_TYPE
    seo?: FRAGMENT_SEO_TYPE
  }
}
