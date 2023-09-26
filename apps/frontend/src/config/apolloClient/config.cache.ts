import { InMemoryCache } from '@apollo/client';

export const CACHE: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        articles: {
          keyArgs: ["filters", "sort"],
          merge(existing, incoming, { args }) {
            let data = [];
            let meta = {};

            if (existing && existing.data) {
              data = data.concat(existing.data);
            }

            if (incoming && incoming.data) {
              data = data.concat(incoming.data);
            }

            if (incoming && incoming.meta) {
              meta = incoming.meta;
            }

            return {
              __typename: incoming.__typename,
              data,
              meta,
            };
          },
        },
      },
    },
  },
});
