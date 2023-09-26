import { gql } from '@apollo/client';
import { FRAGMENT_DATA_CONTENT_PART_EMBED_YOUTUBE, FRAGMENT_DATA_CONTENT_PART_MEDIA, FRAGMENT_DATA_CONTENT_PART_QUOTE, FRAGMENT_DATA_CONTENT_PART_TXT, FRAGMENT_DATA_LEAD, FRAGMENT_DATA_VIEWS } from './../fragments';

export const GET_ARICLE = gql`
  ${FRAGMENT_DATA_LEAD}
  ${FRAGMENT_DATA_VIEWS}
  ${FRAGMENT_DATA_CONTENT_PART_TXT}
  ${FRAGMENT_DATA_CONTENT_PART_MEDIA}
  ${FRAGMENT_DATA_CONTENT_PART_QUOTE}
  ${FRAGMENT_DATA_CONTENT_PART_EMBED_YOUTUBE}

  query GetArticle($id: ID) {
    article(id: $id) {
      data {
        __typename
        id
        attributes {
          type
          title
          createdAt
          seo {
            id
            title
            description
          }
          cover {
            __typename
            data {
              id
              attributes {
                url
                caption
                alternativeText
                formats
              }
            }
          }
          lead {
            ...FragmentDataLead
          }
          tags {
            __typename
            data {
              id
              attributes {
                title
              }
            }
          }
          author {
            __typename
            data {
              id
              attributes {
                username
                avatar {
                  data {
                    attributes {
                      url
                      caption
                      alternativeText
                      formats
                    }
                  }
                }
              }
            }
          }
          views {
            ...FragmentDataViews
          }
          contentparts {
            ...FragmentDataContentPartTxt
            ...FragmentDataContentPartMedia
            ...FragmentDataContentPartQuote
            ...FragmentDataContentPartYouTube
          }
        }
      }
    }
  }
`;

export const GET_ARICLES = gql`
  ${FRAGMENT_DATA_VIEWS}
  query GetArticles($pageSize: Int!, $page: Int!, $type: [String]!) {
    articles(pagination: { pageSize: $pageSize, page: $page }, filters: { type: { in: $type } }, sort: ["createdAt:DESC"]) {
      data {
        __typename
        id
        attributes {
          type
          title
          createdAt
          cover {
            __typename
            data {
              id
              attributes {
                url
                caption
                alternativeText
                formats
              }
            }
          }
          tags {
            __typename
            data {
              id
              attributes {
                title
              }
            }
          }
          author {
            __typename
            data {
              id
              attributes {
                username
                avatar {
                  data {
                    attributes {
                      url
                      caption
                      alternativeText
                      formats
                    }
                  }
                }
              }
            }
          }
          views {
            ...FragmentDataViews
          }
        }
      }
      meta {
        __typename
        pagination {
          page
          total
          pageSize
          pageCount
        }
      }
    }
  }
`;

