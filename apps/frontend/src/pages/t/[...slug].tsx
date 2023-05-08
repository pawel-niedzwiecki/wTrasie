import { LayoutDefault } from 'layout';
import { DataForLayout, DataForSectionListingArticles, ParserDataFromApiGetArticleListToArticlesListData, ParserDataFromGetSettingApiToLayoutData } from '../../utils';
import { clientGetArticlesListWithTagQuery, clientGetSettingPageQuery, clientGetTagQuery } from 'gql';
import { SectionListingArticles } from 'uxu-utils';

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

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const getId = parseInt(slug[0]);

  // set data for SectionListingArticles
  const articlesList = await clientGetArticlesListWithTagQuery({ page: 1, idTag: getId });
  const dataForSectionListingArticles: DataForSectionListingArticles = new ParserDataFromApiGetArticleListToArticlesListData({ getArticlesList: articlesList.data }).getData();

  // set data for LayoutDefault
  const getDataTag = await clientGetTagQuery({ idTag: getId });
  const querySettings = await clientGetSettingPageQuery({ page: 'home' });
  const dataForLayout: DataForLayout = new ParserDataFromGetSettingApiToLayoutData({
    data: querySettings.data,
    slug: `${slug[0]}/${slug[1]}`,
    seo: {
      title: getDataTag?.data?.tag?.data?.attributes?.seo?.title,
      description: getDataTag?.data?.tag?.data?.attributes?.seo?.description,

      openGraph: {
        url: `https://wtrasie.pl/${slug[0]}/${slug[1]}`,
        title: getDataTag?.data?.tag?.data?.attributes?.seo?.title,
        description: getDataTag?.data?.tag?.data?.attributes?.seo?.description,
        type: 'website',
        locale: 'pl',
        images: [{ url: getDataTag?.data?.tag?.data?.attributes?.cover?.data?.attributes?.url }],
      },
    },
  }).getData();

  return {
    // Passed to the page component as props
    props: { dataForLayout, dataForSectionListingArticles },
  };
}
