import { createSlugForType } from "utils";
import { createSlug } from "uxu-utils";
import { GetTagsListQuery } from 'gql';
import { List } from './utils.parser.parserDataFromApiGetTagListToListTitleWithId.types';

export class ParserDataFromApiGetTagListToListTitleWithId {
  list: List;

  constructor () {
    this.list = [];
  }

  parseToList ( getTagsList: GetTagsListQuery ) {
    this.list = [...this.list, ...getTagsList.tags.data.map ( item => ({
      id: item.id,
      title: item.attributes.title,
      slug: `${createSlugForType ( 'tag' )}/${item.id}/${createSlug ( item.attributes.title )}`
    }) )];
  }

  getData ( getTagsList: GetTagsListQuery ): List {
    this.parseToList ( getTagsList );
    return this.list;
  }
}
