export type GET_SETTING_PAGE_TYPE = {
  setting: {
    __typename: string,
    data: {
      __typename: string,
      id: string,
      attributes: {
        socialMedia: {
          __typename: string,
          id: string,
          typ: string | null,
          url: string | null
        }[],
        settingsPages?: [
          {
            __typename: string,
            id: string,
            page: string,
            seo?: {
              __typename: string,
              title: string | null,
              description: string | null,
            },
            filter?: {
              __typename: string,
              id: string,
              key?: string,
              typ: string,
              title: string,
              slug: string
            }[]
          }
        ] | null
      }
    } | null
  } | null
} | null

