import { SiteConfigTypes, SiteIdEnums } from "uxu-utils";
import { NextRouter } from "next/router";

export const SITE_CONFIG = ( clientLocale: string, isMobilePlatform: boolean, router: NextRouter, osInfo: { isWindows: false,  isLinux: false, isMacOS: false } ): SiteConfigTypes => ({
  ads: {
    enabled: true
  },
  analytics: {
    gtmId: "GTM-MC3DNS7"
  },
  port: 4200,
  projectName: 'wTrasie',
  site: {
    id: SiteIdEnums.WTRASIE,
    locale: 'pl',
    domain: 'wtrasie.pl',
    slug:   router.asPath,
    defaultCover: 'https://wtrasie.pl/defaultCover.png',
    canonicalUrl: `https://wtrasie.pl${router.asPath}`,
    images: [{ url: 'https://wtrasie.pl/ogWTrasie.png' }],
    title: 'wTrasie - Wszystko co ważne w trasie',
    shortname: 'wt',
    description: 'wTrasie.pl - W Trasie, informacje prosto z trasy i ulic Twojego miasta. informacje na temat wypadków, wydarzeń oraz firm przydatnych w trasie',
    authEnabled: false,
    switchTheme: true,
    themeDefault: 'dark',
  },
  social: {
    facebook: {
      pageId: '100091647886192'
    }
  },
  client: {
    locale: clientLocale,
    platform: {
      isDesktop: !isMobilePlatform,
      isMobile: isMobilePlatform,
    },
    osInfo: osInfo
  }
});
