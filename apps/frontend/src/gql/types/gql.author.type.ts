import { FRAGMENT_COVER } from './gql.cover.type';

export type FRAGMENT_AUTHOR_TYPE = {
  __typename: string, data: FRAGMENT_AUTHOR_DATA_TYPE
}


export type FRAGMENT_AUTHOR_DATA_TYPE = {
  id
  __typename: string
  attributes: {
    __typename: string
    username: string
    avatar: FRAGMENT_COVER
  }
}
