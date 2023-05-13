import { Box, contents, Footer, Grid, Header, SiteBarPrimary, SiteBarSecondary, useBreakpoints } from 'uxu-utils';
import { Home, Tool } from 'react-feather';
import { useHookSearch } from 'hooks';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { WrapperAlert } from './../layout.global.styles';
import { ComponentLayoutDataType } from './../layout.global.types';

export const LayoutDefault: ComponentLayoutDataType = ( {
                                                          siteBarPrimary,
                                                          siteBarSecondary,
                                                          dataFooter,
                                                          seo,
                                                          alert,
                                                          children
                                                        } ) => {
  const {asPath} = useRouter ();
  const {setQuery, res} = useHookSearch ();
  const {isDesktopOrLaptop} = useBreakpoints ();
  return (
    <>
      <NextSeo {...seo} />
      <Header ComponentAaboveHeader={alert && <WrapperAlert {...alert}/>} res={res}
              tabs={[
                {title: 'Home', value: '/', icon: <Home/>, active: asPath === '/'},
                {
                  title: 'Usługi',
                  value: '/s',
                  icon: <Tool/>,
                  active: asPath === '/s'
                }]} callBack={( search: string ) => setQuery ( search )}/>
      <Grid gridTemplateColumns={{xs: '1fr', m: '250px 1fr', l: '250px 1fr 250px'}}
            style={{maxWidth: contents.maxWidth, margin: '0 auto'}} container>
        <SiteBarPrimary {...siteBarPrimary} />
        <Box position="relative">{children}</Box>
        {isDesktopOrLaptop && <SiteBarSecondary {...siteBarSecondary} />}
      </Grid>
      <Footer columns={dataFooter?.columns}/>
    </>
  );
};
