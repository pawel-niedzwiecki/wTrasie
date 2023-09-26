import { defaultSuggestions } from 'config';
import { SectionInfiniteScroll, LayoutListingPost, useSEOConfig, PostList } from 'uxu-utils';
import { useSearch } from 'hooks';
import { useGetArticlesQuery } from 'gql';
import { adapterArticlesData } from 'utils';

function Index() {
  const onSearchQuery = useSearch();
  const seo = useSEOConfig({});

  const { data, fetchMore } = useGetArticlesQuery({
    variables: {
      pageSize: 12,
      page: 1,
      type: ['article']
    }
  });


  const test = adapterArticlesData(data)

  console.log(test, 'test')

  const handleScrollEnd = async (page: number): Promise<{ page?: number }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ page: 2 });
      }, 10000); // 10 sekund
    });
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
        pageCount={2}
      >
        <PostList />
      </SectionInfiniteScroll>
    </LayoutListingPost>
  );
}

export default Index;
