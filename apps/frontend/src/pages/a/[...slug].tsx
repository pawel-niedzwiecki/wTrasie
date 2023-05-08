import { LayoutWithTwoColumn } from 'layout';
import { SectionArticleFull } from 'uxu-utils';
import { DataForLayout, DataForSectionArticleFull, ParserDataFromApiGetArticleToArticleData, ParserDataFromGetSettingApiToLayoutData } from 'utils';
import { clientGetArticleQuery, clientGetSettingPageQuery } from 'gql';

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

export async function getServerSideProps(context) {
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
    slug: `${slug[0]}/${slug[1]}`,
    seo: {
      title: getArticleData?.data?.article?.data?.attributes?.seo?.title,
      description: getArticleData?.data?.article?.data?.attributes?.seo?.description,
      openGraph: {
        url: `https://wtrasie.pl/${slug[0]}/${slug[1]}`,
        title: getArticleData?.data?.article?.data?.attributes?.seo?.title,
        description: getArticleData?.data?.article?.data?.attributes?.seo?.description,
        type: 'website',
        locale: 'pl',
        images: [{ url: articleData?.data?.cover?.src }],
      },
    },
  }).getData();

  return {
    // Passed to the page component as props
    props: { dataForLayout, dataForSectionArticleFull: { ...articleData } },
  };
}
