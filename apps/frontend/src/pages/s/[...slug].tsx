import { LayoutWithTwoColumn } from 'layout';
import { useRouter } from 'next/router';
import { createSlug, SectionArticleFull } from 'uxu-utils';
import type { DataForLayout, DataForSectionArticleFull } from 'utils';
import { ParserDataFromApiGetArticleListToListTitleWithId, ParserDataFromApiGetArticleToArticleData, ParserDataFromGetSettingApiToLayoutData } from 'utils';
import { clientClientsListWithFiltresCityQuery, clientGetArticleQuery, clientGetArticlesListQuery, clientGetSettingPageQuery } from 'gql';

type Props = {
  dataForLayout: DataForLayout;
  dataForSectionArticleFull: DataForSectionArticleFull;
};

export default function Service({ dataForLayout, dataForSectionArticleFull }: Props) {
  const { query } = useRouter();

  if (query?.alertTel && query?.alertTitle)
    dataForLayout['alert'] = {
      tel: `+${query.alertTel}`,
      title: `${query.alertTitle}`,
    };

  return (
    <LayoutWithTwoColumn {...dataForLayout}>
      <SectionArticleFull {...dataForSectionArticleFull} />
    </LayoutWithTwoColumn>
  );
}

export async function getServerSideProps() {
  const queryListArticles = await clientGetArticlesListQuery({ pageSize: 50, page: 1, type: ['service'] });

  const list = await new ParserDataFromApiGetArticleListToListTitleWithId({
    pageSize: 50,
    getArticlesList: queryListArticles.data,
    types: ['service'],
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
  const getClientsListData = getArticleData?.data?.article?.data?.attributes?.tags?.data?.length && (await clientClientsListWithFiltresCityQuery({ citys: getArticleData?.data?.article?.data?.attributes?.tags?.data.map(tag => tag.id) }));
  const alert = {};
  alert['title'] = getArticleData.data.article.data.attributes.title;
  getClientsListData?.data?.clients?.data[0]?.attributes?.branches[0]?.phones[0]?.phone && (alert['tel'] = getClientsListData?.data?.clients?.data[0]?.attributes?.branches[0]?.phones[0]?.phone);

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
    alert,
  }).getData();

  return {
    // Passed to the page component as props
    props: { dataForLayout, dataForSectionArticleFull: { ...articleData } },
  };
}
