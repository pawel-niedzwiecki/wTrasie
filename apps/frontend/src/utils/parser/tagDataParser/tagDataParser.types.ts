import type { ArticleShortDataType, Pagination, SectionLeadPostWithListProps} from 'uxu-utils';


export type GetDataTypes = {
  dataForSectionListingArticlesSSR: {
    data: ArticleShortDataType[];
    pagination: Pagination;
  }
  dataForSectionLeadPostWithList: SectionLeadPostWithListProps
};
