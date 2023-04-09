import { Box, Grid, Header, SiteBar } from '../uxu-utils';
import { Home } from 'react-feather';
import { useHookSearch } from 'hooks';
import { contents } from 'uxu-utils';
import { useRouter } from 'next/router';
import { Props } from './layout.props';
import { NextSeo } from 'next-seo';


export const Layout: Props = ({ siteBar, seo, alert, children }) => {
  const { asPath } = useRouter();
  const { setQuery, res } = useHookSearch();

  return (
    <>
      <NextSeo {...seo} />
      <Header
        alert={alert}
        res={res}
        tabs={[
          { title: 'Home', value: '/', icon: <Home />, active: asPath === '/' },
        ]}
        callBack={(search: string) => setQuery(search)}
      />
      <Grid gridTemplateColumns={{ xs: '1fr', m: siteBar ? '220px 1fr' : '1rf' }}
            style={{ maxWidth: contents.maxWidth, margin: '0 auto' }} container>
        <SiteBar alert={!alert} {...siteBar} />
        <Box position='relative'>
          {children}
        </Box>
      </Grid>
    </>
  );
};
