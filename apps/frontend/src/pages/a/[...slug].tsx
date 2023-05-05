import { LayoutWithTwoColumn } from 'layout';
import { createSlug, SectionArticleFull } from 'uxu-utils';
import { DataForLayout, DataForSectionArticleFull, ParserDataFromApiGetArticleListToListTitleWithId, ParserDataFromApiGetArticleToArticleData, ParserDataFromGetSettingApiToLayoutData } from 'utils';
import { clientGetArticleQuery, clientGetArticlesListQuery, clientGetSettingPageQuery } from 'gql';

type Props = {
  dataForLayout: DataForLayout;
  dataForSectionArticleFull: DataForSectionArticleFull;
};

export default function Slug({ dataForLayout, dataForSectionArticleFull }: Props) {
  return (
    <LayoutWithTwoColumn {...dataForLayout}>
      <SectionArticleFull {...dataForSectionArticleFull} />
    </LayoutWithTwoColumn>
  );
}

export async function getStaticPaths() {
  const queryListArticles = await clientGetArticlesListQuery({ pageSize: 50, page: 1, type: ['article'] });

  const list = await new ParserDataFromApiGetArticleListToListTitleWithId({
    pageSize: 50,
    getArticlesList: queryListArticles.data,
    types: ['article'],
  }).getData();

  return {
    paths: list.map(item => ({ params: { slug: [item.id, createSlug(item.title)] } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const getId = parseInt(slug[0]);

  // set data for Article
  const getArticleData = await clientGetArticleQuery({ id: getId });
  const articleData = new ParserDataFromApiGetArticleToArticleData({
    getArticleData: getArticleData.data,
    isLoading: false,
  }).getData();

  // set data for LayoutDefault
  const querySettings = await clientGetSettingPageQuery({ page: 'home' });
  const dataForLayout: DataForLayout = new ParserDataFromGetSettingApiToLayoutData({
    data: querySettings.data,
    slug: '/',
    seo: {
      title: getArticleData.data.article.data.attributes.seo.title,
      description: getArticleData.data.article.data.attributes.seo.description,
    },
  }).getData();

  return {
    // Passed to the page component as props
    props: { dataForLayout, dataForSectionArticleFull: { ...articleData } },
  };
}
