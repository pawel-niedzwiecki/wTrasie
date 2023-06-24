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
    const parseData = getTagsList?.tags?.data.map ( item =>  {
      const id = item?.id;
      const title = item?.attributes?.title || null;
      const type = 'tag';

      if(id && title && type) return {
        id, title, slug: `${createSlugForType ( type )}/${id}/${createSlug ( title )}`
      }

      return {id: "", title: "", slug: ""}
    })

    this.list = [...this.list, ...parseData];
  }

  getData ( getTagsList: GetTagsListQuery ): List {
    this.parseToList ( getTagsList );
    return this.list;
  }
}
