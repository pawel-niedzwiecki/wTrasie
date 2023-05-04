import { gql } from '@apollo/client';

export const FRAGMENT_DATA_CONTENT_PART_TXT = gql`
  fragment FragmentDataContentPartTxt on ComponentContentPartsTxt {
    __typename
    id
    txt
  }
`;

export const FRAGMENT_DATA_CONTENT_PART_MEDIA = gql`
  fragment FragmentDataContentPartMedia on ComponentContentPartsMedia {
    id
    media {
      __typename
      data {
        id
        attributes {
          url
          caption
          alternativeText
        }
      }
    }
  }
`;

export const FRAGMENT_DATA_CONTENT_PART_QUOTE = gql`
  fragment FragmentDataContentPartQuote on ComponentContentPartsQuote {
    __typename
    id
    quote
  }
`;

export const FRAGMENT_DATA_CONTENT_PART_EMBED_YOUTUBE = gql`
  fragment FragmentDataContentPartYouTube on ComponentContentPartsYoutube {
    __typename
    id
    url
  }
`;
