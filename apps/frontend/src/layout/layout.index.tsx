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
      <Grid gridTemplateColumns='220px 1fr' gridGap={spaces.default}
            style={{ maxWidth: contents.maxWidth, padding: spaces.default, margin: '0 auto' }} container>
        <SiteBar />
        <Box position='relative' height='300vh'>
          {children}
        </Box>
      </Grid>

    </>
  );
};
