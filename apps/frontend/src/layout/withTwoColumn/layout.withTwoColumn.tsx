import { Box, contents, Footer, Grid, Header, SiteBarPrimary } from 'uxu-utils';
import { Home } from 'react-feather';
import { useHookSearch } from 'hooks';
import { useRouter } from 'next/router';
import { ComponentLayoutDataType } from './../layout.global.types';
import { WrapperAlert } from './../layout.global.styles';
import { NextSeo } from 'next-seo';

export const LayoutWithTwoColumn: ComponentLayoutDataType = ({ siteBarPrimary, siteBarSecondary, dataFooter, seo, alert, children }) => {
  const { asPath } = useRouter();
  const { setQuery, res } = useHookSearch();

  return (
    <>
      <NextSeo {...seo} />
      <Header ComponentAaboveHeader={alert && <WrapperAlert {...alert} />} res={res} tabs={[{ title: 'Home', value: '/', icon: <Home />, active: asPath === '/' }]} callBack={(search: string) => setQuery(search)} />
      <Grid gridTemplateColumns={{ xs: '1fr', m: '250px 1fr' }} style={{ maxWidth: contents.maxWidth, margin: '0 auto' }} container>
        <SiteBarPrimary {...siteBarPrimary} />
        <Box position="relative">{children}</Box>
      </Grid>
      <Footer columns={dataFooter?.columns} />
    </>
  );
};
