import { createSlugForType } from "utils";
import { createSlug } from "uxu-utils";
import { GetArticlesListQuery } from 'gql';
import { GetDataTypes, List, ArticleData } from './parseArticlesToTitleIdSlug.types';


export class ParseArticlesToTitleIdSlug {
  list: List;

  constructor () {
    this.list = [];
  }

  private parseArticleData (articleData: ArticleData) {
    const id = articleData?.id;
    const title = articleData?.attributes?.title || null;
    const type = articleData?.attributes?.type || null;

    if(id && title && type) {
      return {id, title, slug: `${createSlugForType(type)}/${id}/${createSlug(title)}`};
    }

    return null;
  }

  parseToList (getArticlesList: GetArticlesListQuery) {
    if (Array.isArray(getArticlesList?.articles?.data)) {
      const parsedData = getArticlesList.articles.data.map(this.parseArticleData).filter(Boolean);
      this.list = [...this.list, ...parsedData];
    }
  }

  getData (getArticlesList: GetArticlesListQuery): GetDataTypes {
    this.parseToList(getArticlesList);
    return this.list;
  }
}
