import { LayoutPostView, PostView, useSEOConfig } from 'uxu-utils';
import type { GetAdapterArticleData } from 'utils';
import { adapterArticleData } from 'utils';
import { clientGetArticleQuery } from 'gql';
import { defaultSuggestions } from "../../config";
import { useSearch } from "../../hooks";



type ArticleProps = {
  articleData: GetAdapterArticleData;
}

export default function Article({ articleData }: ArticleProps) {
  const onSearchQuery = useSearch();
  const seo = useSEOConfig({ title: articleData?.title, description: articleData.lead, images: [{ url: articleData.cover.src }] });

  return (
    <LayoutPostView
      seo={seo}
      siteBarLeft={<p>left</p>}
      searchEngine={{ defaultSuggestions, onSearchQuery }}
      footer={{ brand: "wTrasie", footerColumns: [] }}
    >
      <PostView postViewData={articleData} />
    </LayoutPostView>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const getId = parseInt(slug[0]);

  // set data for Article
  const { data: getArticleQuery } = await clientGetArticleQuery({ id: getId });
  const articleData = adapterArticleData(getArticleQuery);

  return {
    props: { articleData },
  };
}
