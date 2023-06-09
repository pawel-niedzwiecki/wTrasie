import { createSlugForType } from "utils";
import { createSlug } from "uxu-utils";
import { GetArticlesListQuery } from 'gql';
import { GetDataTypes, List } from './utils.parser.parserDataFromApiGetArticleListToListTitleWithId.types';

export class ParserDataFromApiGetArticleListToListTitleWithId {
  list: List;

  constructor () {
    this.list = [];
  }

   parseToList ( getArticlesList: GetArticlesListQuery ) {
    const parseData = getArticlesList?.articles?.data.map ( item =>  {
      const id = item?.id;
      const title = item?.attributes?.title;
      const type = item?.attributes?.type;

      if(id && title && type) return {
        id, title, slug: `${createSlugForType ( type )}/${id}/${createSlug ( title )}`
      }

      return {id: "", title: "", slug: ""}
    })

    this.list = [...this.list, ...parseData];
  }

  getData (getArticlesList: GetArticlesListQuery): GetDataTypes {
    this.parseToList ( getArticlesList );
    return this.list;
  }
}
