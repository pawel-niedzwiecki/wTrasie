import {
  Box,
  Branch,
  contents,
  Footer,
  Grid,
  Header,
  Link,
  Logo,
  SiteBarPrimary,
  Tree,
  useSiteConfig
} from 'uxu-utils';
import { Home , Tool} from 'react-feather';
import { useHookSearch } from 'hooks';
import { useRouter } from 'next/router';
import { LayoutProps } from './../layout.global.types';
import { NextSeo } from 'next-seo';
import React from "react";
import styles from "../default/layout.default.module.scss";
import { menuItems } from "../default/consts";

export const LayoutWithTwoColumn = ({ siteBarPrimary, siteBarSecondary, dataFooter, seo, alert, children }: LayoutProps) => {
  const {
    client: {
      platform: { isDesktop },
    },
  } = useSiteConfig();

  const router = useRouter();
  const currentSlug = router?.pathname || '/';
  const isLinkActive = (slug) => currentSlug === slug;

  const createNavLink = (slug, title) => (
    <li key={slug}>
      <Link href={slug} title={title} className={isLinkActive(slug) ? styles.active : ''}>
        {title}
      </Link>
    </li>
  );

  const leftAlignedComponents = (
    <>
      <Link href="/" title="wTrasie" className={styles.logo}>
        <Logo brandName={isDesktop ? "wTrasie" : "wTrasieShort"} className={styles.logo} />
      </Link>
      {isDesktop && (
        <nav className={styles.nav}>
          {menuItems.map(({ slug, title }) => createNavLink(slug, title))}
        </nav>
      )}
    </>
  );

  const mobileVerticalModal = (
    <Tree activeSlug={currentSlug} full>
      {menuItems.map(({ slug, title }) => (
        <Branch key={slug} title={title} url={slug} active={isLinkActive(slug)} />
      ))}
    </Tree>
  );


  return (
    <>
      <NextSeo {...seo} />
      <Header
        mobileVerticalModal={mobileVerticalModal}
        leftAlignedComponents={leftAlignedComponents}
        rightAlignedComponents={<button className="btn">feedback</button>}
      />
      <Grid gridTemplateColumns={{ xs: '1fr', m: '250px 1fr' }} style={{ maxWidth: contents.maxWidth, margin: '0 auto' }} container>
        <SiteBarPrimary {...siteBarPrimary} />
        <Box position="relative">{children}</Box>
      </Grid>
      <Footer footerColumnDataWithHeaderAndLinks={dataFooter?.columns} />
    </>
  );
};
