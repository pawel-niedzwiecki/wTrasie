import { defaultSuggestions } from 'config';
import { useSearch } from 'hooks';
import { useGetArticlesQuery } from 'gql';
import { adapterArticlesData } from 'utils';
import { SectionInfiniteScroll, LayoutListingPost, useSEOConfig, PostList } from 'uxu-utils';

function Index() {
  const onSearchQuery = useSearch();
  const seo = useSEOConfig({});

  const { data, fetchMore } = useGetArticlesQuery({
    variables: {
      pageSize: 12,
      page: 1,
      type: ['article']
    },
    ssr: true
  });

  const handleScrollEnd = async (page: number): Promise<{ page?: number }> => {
    try {
      await fetchMore({
        variables: {
          pageSize: 12,
          page,
          type: ['article']
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

export default Index;
