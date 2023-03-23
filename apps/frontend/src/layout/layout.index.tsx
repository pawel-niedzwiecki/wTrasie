import { Box, Grid, Header, SiteBar } from '../uxu-utils';
import { Headphones, Home } from 'react-feather';
import { useHookSearch } from 'hooks';
import { contents, spaces } from 'uxu-utils';

export const Layout = ({ children }: any) => {
  const { setQuery, res } = useHookSearch();

  return (
    <>
      <Header
        res={res}
        tabs={[
          { title: 'Home', value: '/', icon: <Home />, active: true },
          { title: 'Kontakt', value: '/kontakt', icon: <Headphones />, active: false },
        ]}
        callBack={(search: string) => {
          setQuery(search);
        }}
      />
      <Grid gridTemplateColumns={{ xs: '1fr', m: '220px 1fr' }} gridGap={spaces.default}
            style={{ maxWidth: contents.maxWidth, padding: spaces.default, margin: '0 auto' }} container>
        <SiteBar data={{
          cover: {
            isLoading: false,
            img: {
              alt: 'test',
              url: 'https://wtrasiepl.s3.eu-west-1.amazonaws.com/MAM_Logo_heart_9fd4e546cf.jpg?updated_at=2023-01-31T20:39:35.217Z',
            },
          },
        }} />
        <Box position='relative' height='300vh'>
          {children}
        </Box>
      </Grid>

    </>
  );
};
