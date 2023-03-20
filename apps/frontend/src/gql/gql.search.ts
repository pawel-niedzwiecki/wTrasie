import { gql } from '@apollo/client';


export const GET_SEARCH = gql`
    query Search($query: String!) {
        search(query: $query) {
            articles {
                data {
                    id
                    attributes {
                        title
                        type
                        lead {
                            __typename
                            ... on ComponentContentPartsLead {
                                id
                                lead
                            }
                        }
                        views {
                            __typename
                            ... on ComponentStatsViews {
                                id
                                views
                            }
                        }
                        cover{
                            data{
                                id
                                attributes{
                                    alternativeText
                                    formats
                                }
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
