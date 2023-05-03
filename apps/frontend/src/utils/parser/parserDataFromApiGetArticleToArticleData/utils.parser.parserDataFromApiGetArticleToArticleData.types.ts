import type { ArticleDataType } from 'uxu-utils';
import { Enum_Article_Type } from '../../../gql/types/api-gateway.service.generated';

export type ParserDataForArticleTypes = {
  __typename?: 'Article';
  type: Enum_Article_Type;
  title: string;
  createdAt?: any;
  seo: { __typename?: 'ComponentOthersSeo'; id: string; title?: string | null; description?: string | null };
  cover: {
    __typename: 'UploadFileEntityResponse';
    data?: {
      __typename?: 'UploadFileEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'UploadFile';
        url: string;
        caption?: string | null;
        alternativeText?: string | null;
      } | null;
    } | null;
  };
  lead: { __typename: 'ComponentContentPartsLead'; id: string; lead: string };
  tags?: {
    __typename: 'TagRelationResponseCollection';
    data: Array<{
      __typename?: 'TagEntity';
      id?: string | null;
      attributes?: { __typename?: 'Tag'; title: string } | null;
    }>;
  } | null;
  author?: {
    __typename: 'UsersPermissionsUserEntityResponse';
    data?: {
      __typename?: 'UsersPermissionsUserEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'UsersPermissionsUser';
        username: string;
        avatar?: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            attributes?: {
              __typename?: 'UploadFile';
              url: string;
              caption?: string | null;
              alternativeText?: string | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
  views: { __typename: 'ComponentStatsViews'; id: string; views: number };
  contentparts: Array<
    | {
        __typename?: 'ComponentContentPartsMedia';
        id: string;
        media: {
          __typename: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: {
              __typename?: 'UploadFile';
              url: string;
              caption?: string | null;
              alternativeText?: string | null;
            } | null;
          } | null;
        };
      }
    | { __typename: 'ComponentContentPartsQuote'; id: string; quote: string }
    | {
        __typename: 'ComponentContentPartsTxt';
        id: string;
        txt: string;
      }
    | { __typename?: 'Error' }
    | null
  >;
};
export type GetDataTypes = {
  isLoading: boolean;
  data: ArticleDataType;
};
