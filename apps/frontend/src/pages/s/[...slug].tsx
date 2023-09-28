import type { PostViewData } from 'uxu-utils';
import { createSlug, useSEOConfig, LayoutPostView, PostView, AdPhoneClient } from 'uxu-utils';
import { adapterArticleData, connectQueries, ParseArticlesToTitleIdSlug } from 'utils';
import { clientGetArticleQuery, clientGetArticlesQuery, clientClientsListWithFiltresShortNameQuery } from 'gql';
import { useSearch } from "../../hooks";
import { defaultSuggestions } from "../../config";

type ServiceProps = {
  clientPhone?: string;
  articleData: PostViewData;
};

export default function Service ({ articleData, clientPhone }: ServiceProps ) {
  const onSearchQuery = useSearch();
  const seo = useSEOConfig({ title: articleData.title, description: articleData.lead, images: [{ url: articleData?.cover?.src }] });
 const adsWithPhoneClient = clientPhone && {
   tel: clientPhone,
   title: articleData.title,
 }

  return (
    <LayoutPostView
      seo={seo}
      topElement={<AdPhoneClient {...adsWithPhoneClient} />}
      siteBarLeft={<p>SiteBar left</p>}
      searchEngine={{ defaultSuggestions, onSearchQuery }}
      footer={{ brand: "wTrasie", footerColumns: [] }}
    >
      <PostView postViewData={articleData} />
    </LayoutPostView>
  );
}

export async function getStaticPaths() {

  const getArticlesQuery = await clientGetArticlesQuery({ pageSize: 10, page: 1, type: ['service'] });
  const data = await connectQueries({
    functionQuery: clientGetArticlesQuery,
    variablesQuery: { pageSize: 10, type: ['service']},
    pageCount: 12
  });

  console.log(getArticlesQuery?.data?.articles?.meta?.pagination?.pageCount)

  // eslint-disable-next-line prefer-spread
  const articles = [].concat.apply ([], data.map (pageWithArts => {
    return new ParseArticlesToTitleIdSlug().getData(pageWithArts);
  }))

  return {
    paths: articles.map(item => ({ params: {slug: [item.id, createSlug ( item.title )]} })),
    fallback: false,
  };
}

export async function getStaticProps (context) {
  const {slug} = context.params;
  const getId = parseInt ( slug[0] );

  const { data: getArticleQuery } = await clientGetArticleQuery({ id: getId });
  const articleData: PostViewData = adapterArticleData(getArticleQuery);

  // const getArticleData = await clientGetArticleQuery ( { id: getId } );
  const tags = articleData?.tags || [];
  const tagsIds = tags?.map(tag => tag.id);

  const getClientsListData = tagsIds?.length ? await clientClientsListWithFiltresShortNameQuery( { shortname: tagsIds }) : null;
  const clientPhone = getClientsListData?.data?.clients?.data[ 0 ]?.attributes?.branches[ 0 ]?.phones[ 0 ]?.phone || null;


  return {
    props: { articleData, clientPhone },
  };
}
