import { LayoutDefault } from 'layout';
import { NextSeoProps } from 'next-seo';
import { ParserDataFromApiGetArticleListToArticlesListData, ParserDataFromGetSettingApiToLayoutDefaultData } from '../../utils';
import { clientGetArticlesListWithTagQuery, clientGetSettingPageQuery, clientGetTagListQuery, clientGetTagQuery } from 'gql';
import { ArticleShortDataType, createSlug, SectionListingArticles } from 'uxu-utils';
import type { SpecialProps as SiteBarPrimaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import type { SpecialProps as SiteBarSecondaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';
import type { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';

type DataForLayoutDefaultTypes = {
  seo: NextSeoProps;
  dataFooter: FooterDataType;
  siteBarPrimary: SiteBarPrimaryType;
  siteBarSecondary: SiteBarSecondaryType;
};

type DataForSectionListingArticlesTypes = {
  isLoading: boolean;
  data: ArticleShortDataType[];
};

type Props = {
  dataForLayoutDefault: DataForLayoutDefaultTypes;
  dataForSectionListingArticles: DataForSectionListingArticlesTypes;
};

export default function Tag({ dataForLayoutDefault, dataForSectionListingArticles }: Props) {
  return (
    <LayoutDefault {...dataForLayoutDefault}>
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
  const dataForSectionListingArticles: DataForSectionListingArticlesTypes = new ParserDataFromApiGetArticleListToArticlesListData({ getArticlesList: articlesList.data }).getData();

  // set data for LayoutDefault
  const getDataTag = await clientGetTagQuery({ idTag: getId });
  const querySettings = await clientGetSettingPageQuery({ page: 'home' });
  const dataForLayoutDefault: DataForLayoutDefaultTypes = new ParserDataFromGetSettingApiToLayoutDefaultData({
    data: querySettings.data,
    slug: '/',
    seo: {
      title: getDataTag?.data?.tag?.data?.attributes?.seo?.title,
      description: getDataTag?.data?.tag?.data?.attributes?.seo?.description,
    },
  }).getData();

  return {
    // Passed to the page component as props
    props: { dataForLayoutDefault, dataForSectionListingArticles },
  };
}
