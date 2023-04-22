import { Box, Grid, Header, SiteBarPrimary, SiteBarSecondary } from '../uxu-utils';
import { Home } from 'react-feather';
import { useHookSearch } from 'hooks';
import { contents, Footer, useBreakpoints } from 'uxu-utils';
import { useRouter } from 'next/router';
import { Props } from './layout.types';
import { NextSeo } from 'next-seo';

export const Layout: Props = ({ siteBarPrimary, siteBarSecondary, seo, alert, children }) => {
  const { asPath } = useRouter();
  const { setQuery, res } = useHookSearch();
  const { isDesktopOrLaptop } = useBreakpoints();
  return (
    <>
      <NextSeo {...seo} />
      <Header alert={alert} res={res} tabs={[{ title: 'Home', value: '/', icon: <Home />, active: asPath === '/' }]} callBack={(search: string) => setQuery(search)} />
      <Grid gridTemplateColumns={{ xs: '1fr', m: '250px 1fr', l: '250px 1fr 250px' }} style={{ maxWidth: contents.maxWidth, margin: '0 auto' }} container>
        <SiteBarPrimary {...siteBarPrimary} />
        <Box position="relative">{children}</Box>
        {isDesktopOrLaptop && <SiteBarSecondary {...siteBarSecondary} />}
      </Grid>
      <Footer />
    </>
  );
};
