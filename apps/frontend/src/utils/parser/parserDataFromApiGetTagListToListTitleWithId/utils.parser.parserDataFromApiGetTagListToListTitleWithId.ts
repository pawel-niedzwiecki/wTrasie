import { clientGetTagListQuery, GetTagsListQuery } from 'gql';
import { GetDataTypes, List } from './utils.parser.parserDataFromApiGetTagListToListTitleWithId.types';
import { createSlugForType } from "../../function";
import { createSlug } from "../../../uxu-utils";

export class ParserDataFromApiGetTagListToListTitleWithId {
  list: List;
  pageSize: number;
  getTagList: GetTagsListQuery;

  constructor({ getTagList, pageSize }: { getTagList: GetTagsListQuery; pageSize: number }) {
    this.list = [];
    this.pageSize = pageSize;
    this.getTagList = getTagList;
  }

  addToList(query: GetTagsListQuery) {
    this.list = [...this.list, ...query.tags.data.map(item => ({ id: item.id, title: item.attributes.title, slug: `${createSlugForType('tag')}/${item.id}/${createSlug(item.attributes.title)}` }))];
  }

  async fetchAndAddItemsToList(getArticlesList: GetTagsListQuery) {
    const requests = new Array(getArticlesList?.tags?.meta?.pagination?.pageCount || 1).fill(null).map(async (_, i) => {
      if (i !== 0) {
        const query = await clientGetTagListQuery({ pageSize: this.pageSize, page: i + 1 });
        this.addToList(query.data);
      } else this.addToList(getArticlesList);
    });
    await Promise.all(requests);
  }

  async getData(): GetDataTypes {
    await this.fetchAndAddItemsToList(this.getTagList);
    return this.list;
  }
}
