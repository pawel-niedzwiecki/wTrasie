import { createSlugForType } from "utils";
import { createSlug } from "uxu-utils";
import { GetArticlesListQuery } from 'gql';
import { GetDataTypes, List, Types } from './utils.parser.parserDataFromApiGetArticleListToListTitleWithId.types';

export class ParserDataFromApiGetArticleListToListTitleWithId {
  list: List;
  types: Types;
  pageSize: number;
  getArticlesList: GetArticlesListQuery;

  constructor ( {getArticlesList, types, pageSize}: {
    getArticlesList: GetArticlesListQuery;
    types: Types;
    pageSize: number
  } ) {
    this.list = [];
    this.types = types;
    this.pageSize = pageSize;
    this.getArticlesList = getArticlesList;
  }

  async parseToList ( getArticlesList: GetArticlesListQuery ) {
    this.list = [...this.list, ...getArticlesList.articles.data.map ( item => ({
      id: item.id,
      title: item.attributes.title,
      slug: `${createSlugForType ( item.attributes.type )}/${item.id}/${createSlug ( item.attributes.title )}`
    }) )];
  }

  getData (): GetDataTypes {
    this.parseToList ( this.getArticlesList );
    return this.list;
  }
}
