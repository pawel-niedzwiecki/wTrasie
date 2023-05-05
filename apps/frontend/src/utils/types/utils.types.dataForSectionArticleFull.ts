import { ArticleDataType } from '../../uxu-utils';

export type DataForSectionArticleFull = {
  data: ArticleDataType;
  isLoading: boolean;
  alert?: { title?: string; tel?: string };
};
