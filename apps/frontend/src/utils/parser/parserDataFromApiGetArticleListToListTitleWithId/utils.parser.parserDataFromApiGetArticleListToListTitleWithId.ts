import { clientGetArticlesListQuery, GetArticlesListQuery } from 'gql';
import { GetDataTypes, List, Types } from './utils.parser.parserDataFromApiGetArticleListToListTitleWithId.types';

export class ParserDataFromApiGetArticleListToListTitleWithId {
  list: List;
  types: Types;
  pageSize: number;
  getArticlesList: GetArticlesListQuery;

  constructor({ getArticlesList, types, pageSize }: { getArticlesList: GetArticlesListQuery; types: Types; pageSize: number }) {
    this.list = [];
    this.types = types;
    this.pageSize = pageSize;
    this.getArticlesList = getArticlesList;
  }

  addToList(query: GetArticlesListQuery) {
    this.list = [...this.list, ...query.articles.data.map(item => ({ id: item.id, title: item.attributes.title }))];
  }

  async fetchAndAddItemsToList(getArticlesList: GetArticlesListQuery) {
    const requests = new Array(getArticlesList?.articles?.meta?.pagination?.pageCount || 1).fill(null).map(async (_, i) => {
      if (i !== 0) {
        const query = await clientGetArticlesListQuery({ pageSize: this.pageSize, page: i + 1, type: this.types });
        this.addToList(query.data);
      } else this.addToList(getArticlesList);
    });
    await Promise.all(requests);
  }

  async getData(): GetDataTypes {
    await this.fetchAndAddItemsToList(this.getArticlesList);
    return this.list;
  }
}
