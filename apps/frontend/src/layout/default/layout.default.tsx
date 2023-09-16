import React from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import styles from './layout.default.module.scss';
import { Footer, Header, SiteBarPrimary, SiteBarSecondary, Logo, useSiteConfig, Tree, Branch, Link, Container, Feedback } from 'uxu-utils';
import { menuItems } from "./consts";

export const LayoutDefault = ({ topElement, siteBarPrimary, siteBarSecondary, dataFooter, seo, children }) => {
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
        rightAlignedComponents={<Feedback switchModalButtonText="sugestia" onFeedbackSubmit={async (data: { email: string; message: string; feedbackRating: string;}) => {
          console.log(data)
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({ success: true });
            }, 5000);
          });
        }}/>}
      />
      <div className={styles.headerBox}></div>
      {topElement}
      <Container>
        <div className={styles.container}>
          <SiteBarPrimary {...siteBarPrimary} />
          <div style={{ position: 'relative' }}>{children}</div>
          {isDesktop && <SiteBarSecondary {...siteBarSecondary} />}
        </div>
      </Container>
      <Footer footerColumnDataWithHeaderAndLinks={dataFooter?.columns} />
    </>
  );
};
