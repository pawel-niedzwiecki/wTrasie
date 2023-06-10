
import type { ArticleShortDataType, Pagination } from 'uxu-utils';

export type ParserDataForPaginationTypes = {
  __typename: "Pagination";
  page: number;
  pageCount: number;
  pageSize: number;
  total: number
}

export type GetDataTypes = {
  pagination: Pagination;
  data: ArticleShortDataType[];
};
