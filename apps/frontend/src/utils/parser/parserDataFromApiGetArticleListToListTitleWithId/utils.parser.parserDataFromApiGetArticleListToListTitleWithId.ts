import { createSlugForType } from "utils";
import { createSlug } from "uxu-utils";
import { GetArticlesListQuery } from 'gql';
import { GetDataTypes, List } from './utils.parser.parserDataFromApiGetArticleListToListTitleWithId.types';

export class ParserDataFromApiGetArticleListToListTitleWithId {
  list: List;

  constructor () {
    this.list = [];
  }

  async parseToList ( getArticlesList: GetArticlesListQuery ) {
    this.list = [...this.list, ...getArticlesList.articles.data.map ( item => ({
      id: item.id,
      title: item.attributes.title,
      slug: `${createSlugForType ( item.attributes.type )}/${item.id}/${createSlug ( item.attributes.title )}`
    }) )];
  }

  getData (getArticlesList: GetArticlesListQuery): GetDataTypes {
    this.parseToList ( getArticlesList );
    return this.list;
  }
}
