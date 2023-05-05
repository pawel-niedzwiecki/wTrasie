import { LayoutDefault } from 'layout';
import { DataForLayout, DataForSectionListingArticles, ParserDataFromApiGetArticleListToArticlesListData, ParserDataFromGetSettingApiToLayoutData } from '../../utils';
import { clientGetArticlesListWithTagQuery, clientGetSettingPageQuery, clientGetTagListQuery, clientGetTagQuery } from 'gql';
import { createSlug, SectionListingArticles } from 'uxu-utils';

type Props = {
  dataForLayout: DataForLayout;
  dataForSectionListingArticles: DataForSectionListingArticles;
};

export default function Tag({ dataForLayout, dataForSectionListingArticles }: Props) {
  return (
    <LayoutDefault {...dataForLayout}>
      <SectionListingArticles {...dataForSectionListingArticles} />
    </LayoutDefault>
  );
}

export async function getStaticPaths() {
  const queryListTags = await clientGetTagListQuery({ page: 1 });

  return {
    paths: queryListTags?.data?.tags?.data?.map(tag => ({
      params: { slug: `${createSlug(tag.attributes.title)}-${tag.id}` },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const getId = parseInt(/(\d*)$/.exec(slug)[0]);

  // set data for SectionListingArticles
  const articlesList = await clientGetArticlesListWithTagQuery({ page: 1, idTag: getId });
  const dataForSectionListingArticles: DataForSectionListingArticles = new ParserDataFromApiGetArticleListToArticlesListData({ getArticlesList: articlesList.data }).getData();

  // set data for LayoutDefault
  const getDataTag = await clientGetTagQuery({ idTag: getId });
  const querySettings = await clientGetSettingPageQuery({ page: 'home' });
  const dataForLayout: DataForLayout = new ParserDataFromGetSettingApiToLayoutData({
    data: querySettings.data,
    slug: '/',
    seo: {
      title: getDataTag?.data?.tag?.data?.attributes?.seo?.title,
      description: getDataTag?.data?.tag?.data?.attributes?.seo?.description,
    },
  }).getData();

  return {
    // Passed to the page component as props
    props: { dataForLayout, dataForSectionListingArticles },
  };
}
