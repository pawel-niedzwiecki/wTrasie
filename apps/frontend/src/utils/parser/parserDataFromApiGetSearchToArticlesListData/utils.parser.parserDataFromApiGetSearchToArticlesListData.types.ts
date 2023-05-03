import { Enum_Article_Type } from 'gql/types/api-gateway.service.generated';
import type { ArticleShortDataType } from 'uxu-utils';

export type ParserDataForArticlesTypes = Array<{
  __typename?: 'ArticleEntity';
  id?: string | null;
  attributes?: {
    __typename?: 'Article';
    createdAt?: any;
    title: string;
    type: Enum_Article_Type;
    cover: {
      __typename?: 'UploadFileEntityResponse';
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
  } | null;
}>;

export type GetDataTypes = {
  isLoading: boolean;
  data: ArticleShortDataType[];
};
