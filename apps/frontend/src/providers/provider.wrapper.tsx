import React, { PropsWithChildren } from 'react';
import { SEOProvider } from './provider.seo';
import { SiteConfigProvider } from 'uxu-utils';
import { SITE_CONFIG } from 'config';
import { ApolloCLientProvider } from './provider.apollo';

type Props = PropsWithChildren<{
  clientLocale: string;
  isMobilePlatform: boolean;
  osInfo: { isWindows: boolean, isLinux: boolean, isMacOS: boolean };
}>;


export const WrapperProviders = ( { children, clientLocale, isMobilePlatform, osInfo }: Props ) => {
  return (
    <SiteConfigProvider clientLocale={clientLocale} isMobilePlatform={isMobilePlatform} osInfo={osInfo} SITE_CONFIG={SITE_CONFIG}>
        <SEOProvider>
          <ApolloCLientProvider>{children}</ApolloCLientProvider>
        </SEOProvider>
    </SiteConfigProvider>
  );
};
