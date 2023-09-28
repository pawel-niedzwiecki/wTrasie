import { DefaultSeo, DefaultSeoProps } from 'next-seo';
import type { PropsWithChildren } from 'react';
import { useContext } from 'react';
import { SEO_CONFIG_DEFAULT } from 'config';
import { SiteConfigContext } from 'uxu-utils';


type SEOProviderProps = PropsWithChildren
export const SEOProvider = ({ children }: SEOProviderProps) => {
  const siteConfig = useContext(SiteConfigContext);

  const seoConfig: DefaultSeoProps = SEO_CONFIG_DEFAULT({
    locale: siteConfig?.site?.locale,
    url: siteConfig?.site?.canonicalUrl,
    title: siteConfig?.site?.title,
    description: siteConfig?.site?.description,
    defaultCover: siteConfig?.site?.defaultCover,
  });

  return (
    <>
      <DefaultSeo {...seoConfig} />
      {children}
    </>
  );
};

