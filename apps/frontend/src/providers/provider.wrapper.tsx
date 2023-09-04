import React, { PropsWithChildren } from 'react';
import { SEOProvider } from './provider.seo';
import { SiteConfigProvider } from 'uxu-utils';
import { SITE_CONFIG } from 'config';
import { ApolloCLientProvider } from './provider.apollo';
import { theme } from 'uxu-utils';
import { ThemeProvider } from 'styled-components';

type Props = PropsWithChildren<{
  clientLocale: string;
  isMobilePlatform: boolean;
}>;


export const WrapperProviders = ( {children, clientLocale, isMobilePlatform}: Props ) => {
  return (
    <SiteConfigProvider clientLocale={clientLocale} isMobilePlatform={isMobilePlatform} SITE_CONFIG={SITE_CONFIG}>
      <ThemeProvider theme={theme}>
        <SEOProvider>
          <ApolloCLientProvider>{children}</ApolloCLientProvider>
        </SEOProvider>
      </ThemeProvider>
    </SiteConfigProvider>
  );
};
