import { GetArticlesListQuery, GetTagQuery } from 'gql';
import type { SectionLeadPostWithListProps } from 'uxu-utils';
import { separateArrayAt } from 'utils';
import { ArticleShortDataType, createSlug, Pagination, ContentPartTypeEnum } from 'uxu-utils';
import { createSlugForType } from '../../function';
import { parserDataImg } from '../parserDataImg';
import { GetDataTypes } from './tagDataParser.types';

export class TagDataParser {
  canonicalURL: string;
  tagData: SectionLeadPostWithListProps;
  articleListData: ArticleShortDataType[];
  pagination: Pagination;

  constructor ({tagQuery, articlesListQuery, pagination}: {
    tagQuery: GetTagQuery;
    articlesListQuery: GetArticlesListQuery;
    pagination?: Pagination;
  }) {
    this.tagData = this.parseTagData(tagQuery);
    const {initialElements, remainingElements} = this.parseArticleList(articlesListQuery);
    this.tagData.list = initialElements;
    this.articleListData = remainingElements;
    this.pagination = this.parsePaginationData(articlesListQuery, pagination);
  }

  private parseTagData (tagQuery: GetTagQuery): SectionLeadPostWithListProps {
    return {
      main: {
        title: tagQuery?.tag?.data?.attributes?.title || null,
        lead: tagQuery?.tag?.data?.attributes?.lead?.lead || null,
        cover: {
          src: tagQuery?.tag?.data?.attributes?.cover?.data?.attributes?.url || null,
          alt: tagQuery?.tag?.data?.attributes?.cover?.data?.attributes?.alternativeText || null
        },
        contentparts: tagQuery?.tag?.data?.attributes?.contentparts?.map ( ( content, i ) => {
          const data = {
            id: `${i}`,
            value: null,
            type: null,
          };

          switch (content?.__typename) {
            case 'ComponentContentPartsTxt':
              data[ 'id' ] = content?.id || `${i}`;
              data[ 'value' ] = content?.txt;
              data[ 'type' ] = ContentPartTypeEnum.PARAGRAPH;
              break;
          }

          return data
        })
      }
    };
  }

  private parsePaginationData (articlesListQuery: GetArticlesListQuery, pagination?: Pagination): Pagination {
    return {
      page: articlesListQuery?.articles?.meta?.pagination?.page || 1,
      pageSize: articlesListQuery?.articles?.meta?.pagination?.pageSize || 1,
      pageCount: articlesListQuery?.articles?.meta?.pagination?.pageCount || 1,
      ...pagination
    };
  }

  private parseArticleList (articlesListQuery: GetArticlesListQuery): {initialElements: ArticleShortDataType[], remainingElements: ArticleShortDataType[]} {
    if (!articlesListQuery?.articles?.data?.length) return {initialElements: [], remainingElements: []};
    const {initialElements, remainingElements} = separateArrayAt(articlesListQuery.articles.data, 4);
    const mapArticleData = (art) => ({
      content: {
        id: art?.id,
        title: art?.attributes?.title || null,
        slug: `${createSlugForType ( art?.attributes?.type )}/${art?.id}/${createSlug ( art?.attributes?.title || null )}`,
        createdAt: art?.attributes?.createdAt || null,
        author: {
          name: art?.attributes?.author?.data?.attributes?.username || null,
          avatar: {
            src: parserDataImg({attributes: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes || null, typeImg: 'thumbnail'}),
            alt: art?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText || null,
          },
        },
        cover: {
          src: parserDataImg({attributes: art?.attributes?.cover?.data?.attributes || null, typeImg: 'small'}),
          alt: art?.attributes?.cover?.data?.attributes?.alternativeText || null,
        },
        tags: art?.attributes?.tags?.data?.map(tag => ({
          title: tag?.attributes?.title || null,
          slug: `${createSlugForType(`tag`)}/${tag?.id}/${createSlug(tag?.attributes?.title || null)}`,
        })) || [],
        stats: {ratings: 0, comments: 0, views: 0},
      },
    });

    return {
      initialElements: initialElements.map(mapArticleData),
      remainingElements: remainingElements.map(mapArticleData)
    };
  }

  getData(): GetDataTypes {
    return {
      dataForSectionListingArticlesSSR: {
        data: this.articleListData,
        pagination: this.pagination,
      },
      dataForSectionLeadPostWithList: this.tagData,
    };
  }
}
