import { LayoutListingPost, SectionInfiniteScroll, PostList, useSEOConfig } from 'uxu-utils';
import { useSearch } from "../../hooks";
import { useGetArticlesWithTagQuery } from 'gql';
import { adapterArticlesData } from 'utils';
import { defaultSuggestions } from "../../config";

type TagProps = {
  tagID: string;
  tagName?: string;
};

export default function Tag ({ tagID , tagName }: TagProps ) {
  const onSearchQuery = useSearch();
  const { data, fetchMore } = useGetArticlesWithTagQuery({
    variables: {
      pageSize: 12,
      page: 1,
      type: ['article', 'service'],
      tagID: tagID
    },
    ssr: true
  });
  const seo = useSEOConfig({ title: tagName });

  const handleScrollEnd = async (page: number): Promise<{ page?: number }> => {
    try {
      await fetchMore({
        variables: {
          pageSize: 12,
          page,
          type: ['article', 'service']
        }
      });
      return { page: page + 1 };
    } catch (error) {
      console.error("Błąd podczas ładowania więcej artykułów:", error);
      throw error;
    }
  };

  return (
    <LayoutListingPost
      seo={seo}
      siteBarLeft={<p>left</p>}
      siteBarRight={<p>right</p>}
      searchEngine={{ defaultSuggestions, onSearchQuery }}
      footer={{ brand: "wTrasie", footerColumns: [] }}
    >
      <SectionInfiniteScroll
        onScrollEnd={handleScrollEnd}
        page={1}
        pageCount={data?.articles?.meta?.pagination?.pageCount || 1}
      >
        {adapterArticlesData(data)?.map((article, index) => {
          return (
            <PostList {...article} key={index} />
          )
        })}
      </SectionInfiniteScroll>
    </LayoutListingPost>
  );
}

export async function getServerSideProps({ params: { slug }}) {
  const tagID = slug[ 0 ];
  const tagName = slug[1];

  return {
    props: { tagID , tagName },
  };
}
