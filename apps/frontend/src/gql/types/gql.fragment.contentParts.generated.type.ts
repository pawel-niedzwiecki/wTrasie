import * as Types from './api-gateway.service.generated';

import { gql } from '@apollo/client';
export type FragmentDataContentPartTxtFragment = { __typename: 'ComponentContentPartsTxt', id: string, txt: string };

export type FragmentDataContentPartMediaFragment = { __typename?: 'ComponentContentPartsMedia', id: string, media: { __typename: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, caption?: string | null, alternativeText?: string | null, formats?: any | null } | null } | null } };

export type FragmentDataContentPartQuoteFragment = { __typename: 'ComponentContentPartsQuote', id: string, quote: string };

export type FragmentDataContentPartYouTubeFragment = { __typename: 'ComponentContentPartsYoutube', id: string, url: string };

export const FragmentDataContentPartTxtFragmentDoc = gql`
    fragment FragmentDataContentPartTxt on ComponentContentPartsTxt {
  __typename
  id
  txt
}
    `;
export const FragmentDataContentPartMediaFragmentDoc = gql`
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
        formats
      }
    }
  }
}
    `;
export const FragmentDataContentPartQuoteFragmentDoc = gql`
    fragment FragmentDataContentPartQuote on ComponentContentPartsQuote {
  __typename
  id
  quote
}
    `;
export const FragmentDataContentPartYouTubeFragmentDoc = gql`
    fragment FragmentDataContentPartYouTube on ComponentContentPartsYoutube {
  __typename
  id
  url
}
    `;