import { GetArticlesListQuery } from "../../../gql";

export type ArticleData = GetArticlesListQuery['articles']['data'][number];

export type Types = Array<string>;

export type List = Array<{ title: string; id: string, slug: string }>;

export type GetDataTypes = List;
