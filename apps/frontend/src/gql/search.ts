import { gql } from '@apollo/client';


export const GET_SEARCH = gql`
    query Search($query: String!) {
        search(query: $query) {
            articles {
                data {
                    id
                    attributes {
                        title
                        views {
                            __typename
                            ... on ComponentStatsViews {
                                id
                                views
                            }
                        }
                        tags {
                            data {
                                id
                                attributes {
                                    title
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
