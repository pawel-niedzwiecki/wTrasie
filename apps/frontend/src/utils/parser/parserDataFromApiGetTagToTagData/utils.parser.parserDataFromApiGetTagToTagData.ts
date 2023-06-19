import { GetArticlesListQuery, GetTagQuery } from 'gql';
import type { SectionLeadPostWithListProps, ContentPartPropsType } from 'uxu-utils';
import { separateArrayAt } from 'utils';
import { ArticleShortDataType, createSlug, Pagination, ContentPartTypeEnum } from 'uxu-utils';
import { createSlugForType } from '../../function';
import { parserDataImg } from '../parserDataImg';
import { GetDataTypes } from './utils.parser.parserDataFromApiGetTagToTagData.types';

export class parserDataFromApiGetTagToTagData {
  canonicalURL: string;
  getTagData: GetTagQuery;
  tagData: SectionLeadPostWithListProps;
  getArticlesList: GetArticlesListQuery;
  articleListData: ArticleShortDataType[];
  pagination: Pagination

  constructor ( {getTagData, getArticlesList, pagination}: {
    getTagData: GetTagQuery;
    getArticlesList: GetArticlesListQuery;
    pagination?: Pagination
  } ) {
    this.tagData = {
      main: {
        title: "#",
        lead: "#"
      }
    };
    this.getTagData = getTagData;
    this.articleListData = [];
    this.getArticlesList = getArticlesList;
    this.pagination = {
      page: 1,
      pageSize: 1,
      pageCount: 1,
      ...pagination
    };
  }


  parserDataForTag ( getTagData: GetTagQuery ) {
    const data:  { title: string, lead: string, cover: { src: string | null, alt: string | null }, contentparts: ContentPartPropsType[]} = {
      title: getTagData?.tag?.data?.attributes?.title || "",
      lead: getTagData?.tag?.data?.attributes?.lead?.lead || "",
      cover: {
        src: getTagData?.tag?.data?.attributes?.cover?.data?.attributes?.url || null,
        alt: getTagData?.tag?.data?.attributes?.cover?.data?.attributes?.alternativeText || null
      },
      contentparts: getTagData?.tag?.data?.attributes?.contentparts?.map ( ( content, i ) => {
        const data = {
          id: `${i}`,
        };

        switch (content?.__typename) {
          case 'ComponentContentPartsTxt':
            data[ 'id' ] = content?.id || `${i}`;
            data[ 'value' ] = content?.txt;
            data[ 'type' ] = ContentPartTypeEnum.PARAGRAPH;
            break;
        }

        return data
      } )
    }

    this.tagData.main = data;
  }

  parserDataForPagination ( pagination: GetArticlesListQuery ) {
    this.pagination = {
      ...this.pagination,
      page: pagination?.articles?.meta?.pagination?.page || 1,
      pageSize: pagination?.articles?.meta?.pagination?.pageSize || 1,
      pageCount: pagination?.articles?.meta?.pagination?.pageCount || 1,
    };
  }

  parserDataListArticles ( listArticles?: GetArticlesListQuery ) {
    if ( !listArticles?.articles?.data?.length ) return null;
    const {initialElements, remainingElements} = separateArrayAt ( listArticles.articles.data, 4 );

    this.tagData.list = initialElements?.map ( art => ({
      content: {
        id: art?.id,
        title: art?.attributes?.title || null,
        slug: `${createSlugForType ( art?.attributes?.type )}/${art?.id}/${createSlug ( art?.attributes?.title || null )}`,
        createdAt: art?.attributes?.createdAt || null,
        author: {
          name: art?.attributes?.author?.data?.attributes?.username || null,
          avatar: {
            src: parserDataImg ( {
              attributes: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes || null,
              typeImg: 'thumbnail'
            } ),
            alt: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText || null,
          },
        },
        cover: {
          src: parserDataImg ( {attributes: art?.attributes?.cover?.data?.attributes || null, typeImg: 'small'} ),
          alt: art?.attributes?.cover?.data?.attributes?.alternativeText || null,
        },
        tags:
          art?.attributes?.tags?.data?.map ( tag => ({
            title: tag?.attributes?.title || null,
            slug: `${createSlugForType ( `tag` )}/${tag?.id}/${createSlug ( tag?.attributes?.title || null )}`,
          }) ) || [],
        stats: {ratings: 0, comments: 0, views: 0},
      },
    }) );

    this.articleListData = remainingElements?.map ( art => ({
      content: {
        id: art?.id,
        title: art?.attributes?.title || null,
        slug: `${createSlugForType ( art?.attributes?.type )}/${art?.id}/${createSlug ( art?.attributes?.title || null )}`,
        createdAt: art?.attributes?.createdAt || null,
        author: {
          name: art?.attributes?.author?.data?.attributes?.username || null,
          avatar: {
            src: parserDataImg ( {
              attributes: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes || null,
              typeImg: 'thumbnail'
            } ),
            alt: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText || null,
          },
        },
        cover: {
          src: parserDataImg ( {attributes: art?.attributes?.cover?.data?.attributes || null, typeImg: 'small'} ),
          alt: art?.attributes?.cover?.data?.attributes?.alternativeText || null,
        },
        tags:
          art?.attributes?.tags?.data?.map ( tag => ({
            title: tag?.attributes?.title,
            slug: `${createSlugForType ( `tag` )}/${tag?.id}/${createSlug ( tag?.attributes?.title )}`,
          }) ) || [],
        stats: {ratings: 0, comments: 0, views: 0},
      },
    }) );
  }

  getData (): GetDataTypes {
    this.parserDataListArticles ( this?.getArticlesList );
    this.parserDataForPagination ( this.getArticlesList );
    this.parserDataForTag(this.getTagData);


    return {
      dataForSectionListingArticlesSSR: {
        data: this?.articleListData,
        pagination: this?.pagination
      },
      dataForSectionLeadPostWithList: this?.tagData
    };
  }
}
