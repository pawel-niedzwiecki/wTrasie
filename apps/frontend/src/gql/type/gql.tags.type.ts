export type FRAGMENT_TAGS_TYPE = {
  __typename: string, data: FRAGMENT_TAG_TYPE[]
}


export type FRAGMENT_TAG_TYPE = {
  id
  attributes: {
    __typename: string
    title: string
  }
}
