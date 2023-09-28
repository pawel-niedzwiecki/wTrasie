import { GetArticlesQuery } from "../../../gql";

export type ArticleData = GetArticlesQuery['articles']['data'][number];

export type Types = Array<string>;

export type List = Array<{ title: string; id: string, slug: string }>;

export type GetDataTypes = List;
