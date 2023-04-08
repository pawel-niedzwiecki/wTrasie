import { typeListingVar } from 'uxu-utils';
import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        typeListing: {
          read() {
            return typeListingVar();
          },
        },
      },
    },
  },
});


