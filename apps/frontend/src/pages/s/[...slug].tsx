import { LayoutWithTwoColumn } from 'layout';
import { useRouter } from 'next/router';
import { SectionArticleFull, createSlug } from 'uxu-utils';
import type { DataForLayout, DataForSectionArticleFull } from 'utils';
import {
  connectQuerys,
  ParseArticlesToTitleIdSlug,
  ParserApiDataToArticle,
  ParserApiDataToLayoutData
} from 'utils';
import {
  clientClientsListWithFiltresShortNameQuery,
  clientGetArticleQuery,
  clientGetArticlesListQuery,
  clientGetSettingPageQuery
} from 'gql';

type Props = {
  dataForLayout: DataForLayout;
  dataForSectionArticleFull: DataForSectionArticleFull;
};

export default function Service ( {dataForLayout, dataForSectionArticleFull}: Props ) {
  const {query} = useRouter ();

  if ( query?.alertTel && query?.alertTitle )
    dataForLayout[ 'alert' ] = {
      tel: `+${query.alertTel}`,
      title: `${query.alertTitle}`,
    };

  return (
    <LayoutWithTwoColumn {...dataForLayout}>
      <SectionArticleFull {...dataForSectionArticleFull} />
    </LayoutWithTwoColumn>
  );
}

export async function getStaticPaths () {

  const query = await clientGetArticlesListQuery ( {pageSize: 25, page: 1, type: ['service']} );
  const data = await connectQuerys ( {
    functionQuery: clientGetArticlesListQuery,
    variablesQuery: {pageSize: query?.data?.articles?.meta?.pagination?.pageCount || 1, type: ['service']},
    pageCount: 25
  } )


  // eslint-disable-next-line prefer-spread
  const listArticles = [].concat.apply ( [], data.map ( pageWithArts => {
    return new ParseArticlesToTitleIdSlug ().getData ( pageWithArts )
  } ) )

  return {
    paths: listArticles.map ( item => ({params: {slug: [item.id, createSlug ( item.title )]}}) ),
    fallback: false,
  };
}

export async function getStaticProps ( context ) {
  const {slug} = context.params;
  const getId = parseInt ( slug[ 0 ] );

  const getArticleData = await clientGetArticleQuery ( {id: getId} );
  const {title, seo, tags} = getArticleData?.data?.article?.data?.attributes || {};
  const tagIds = tags?.data?.map ( tag => tag.id );
  const getClientsListData = tagIds?.length ? await clientClientsListWithFiltresShortNameQuery ( {shortname: tagIds} ) : null;
  const alertPhone = getClientsListData?.data?.clients?.data[ 0 ]?.attributes?.branches[ 0 ]?.phones[ 0 ]?.phone || null;

  const canonicalURL = `https://wtrasie.pl/s/${slug[ 0 ]}/${slug[ 1 ]}`;
  const articleData = new ParserApiDataToArticle ( {
    canonicalURL,
    getArticleData: getArticleData.data,
    isLoading: false,
  } ).getData ();

  const querySettings = await clientGetSettingPageQuery ( {page: 'home'} );
  const seoData = {
    title: seo?.title || null,
    description: seo?.description || null,
    openGraph: {
      url: canonicalURL || null,
      title: seo?.title || null,
      description: seo?.description || null,
      type: 'website',
      locale: 'pl',
      images: [{url: articleData?.data?.cover?.src || null}],
    },
  };
  const dataForLayout: DataForLayout = new ParserApiDataToLayoutData (querySettings?.data, '/', true, false, seoData).getData ();

  return {
    props: {dataForLayout: {...dataForLayout, alert: { title: title, tel: alertPhone }}, dataForSectionArticleFull: {...articleData}},
  };
}
