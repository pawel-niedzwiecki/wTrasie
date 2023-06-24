import { LayoutDefault } from 'layout';
import { SectionListingArticles, SectionLeadPostWithList } from 'uxu-utils';
import type { SectionLeadPostWithListProps } from 'uxu-utils';
import { useHookListingArticles } from "../../hooks";
import { clientGetArticlesListQuery, clientGetSettingPageQuery, clientGetTagQuery } from 'gql';
import { DataForLayout, DataForSectionListingArticles, ParserApiDataToLayoutData, TagDataParser } from 'utils';

type Props = {
  idTag: number;
  dataForLayout: DataForLayout;
  dataForSectionListingArticlesSSR: DataForSectionListingArticles;
  dataForSectionLeadPostWithList: SectionLeadPostWithListProps;
};

export default function Tag ({ idTag, dataForLayout, dataForSectionListingArticlesSSR, dataForSectionLeadPostWithList }: Props ) {
  const {dataClient} = useHookListingArticles ( {
    dataSSR: dataForSectionListingArticlesSSR,
    queryVariables: {pageSize: 12, page: 1, type: ['article', 'service'], idTag: `${idTag}`}
  } );

  return (
    <LayoutDefault {...dataForLayout} topElement={<SectionLeadPostWithList {...dataForSectionLeadPostWithList} />}>
      <SectionListingArticles dataSSR={dataForSectionListingArticlesSSR} dataClient={dataClient}/>
    </LayoutDefault>
  );
}

export async function getServerSideProps ( {params: {slug}} ) {
  const idTag = parseInt ( slug[ 0 ] );

  const [getDataTag, articlesList, querySettings] = await Promise.all ( [
    clientGetTagQuery ( {idTag} ),
    clientGetArticlesListQuery ( {page: 1, idTag} ),
    clientGetSettingPageQuery ( {page: 'home'} )
  ] );

  const {dataForSectionListingArticlesSSR, dataForSectionLeadPostWithList} =
    new TagDataParser ( {articlesListQuery: articlesList.data, tagQuery: getDataTag.data} ).getData ();

  const dataForLayout = getDataForLayout ( querySettings.data, slug, getDataTag );

  return {
    props: {dataForLayout, dataForSectionListingArticlesSSR, idTag, dataForSectionLeadPostWithList},
  };
}

function getDataForLayout ( data, slug, getDataTag ) {
  const {title, description, cover} = getDataTag?.data?.tag?.data?.attributes?.seo || {};
  const url = cover?.data?.attributes?.url || null;

  return new ParserApiDataToLayoutData(
    data,
    `${slug[ 0 ]}/${slug[ 1 ]}`,
    true,
    false,
    {
    title,
    description,
    openGraph: {
      url: `https://wtrasie.pl/${slug[ 0 ]}/${slug[ 1 ]}`,
      title,
      description,
      type: 'website',
      locale: 'pl',
      images: [{url}],
    }
  } ).getData();
}
