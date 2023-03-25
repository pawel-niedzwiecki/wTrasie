import { Box, Grid, Header, SiteBar } from '../uxu-utils';
import { Headphones, Home } from 'react-feather';
import { useHookSearch } from 'hooks';
import { contents, spaces } from 'uxu-utils';
import { useRouter } from 'next/router';
import { Props } from './layout.props';
import { NextSeo } from 'next-seo';


export const Layout: Props = ({ siteBar, seo, children }) => {
  const { asPath } = useRouter();
  const { setQuery, res } = useHookSearch();

  return (
    <>
      <NextSeo {...seo} />
      <Header
        res={res}
        tabs={[
          { title: 'Home', value: '/', icon: <Home />, active: asPath === '/' },
          { title: 'Kontakt', value: '/kontakt', icon: <Headphones />, active: asPath === '/kontakt' },
        ]}
        callBack={(search: string) => setQuery(search)}
      />
      <Grid gridTemplateColumns={{ xs: '1fr', m: siteBar ? '220px 1fr' : '1rf' }} gridGap={spaces.default}
            style={{ maxWidth: contents.maxWidth, padding: spaces.default, margin: '0 auto' }} container>
        <SiteBar {...siteBar} />
        <Box position='relative'>
          {children}
        </Box>
      </Grid>

    </>
  );
};
