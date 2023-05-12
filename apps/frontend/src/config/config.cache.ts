import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        articles: {
          keyArgs: ["pagination", "filters", "sort"],
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
