import { FC } from 'react';
import { NextSeoProps } from 'next-seo';
import type { FunctionComponentDiv } from 'uxu-utils';
import type { SpecialProps as SiteBarPrimaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import type { SpecialProps as SiteBarSecondaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';
import type { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';

export type SpecialProps = {
  siteBarSecondary?: SiteBarSecondaryType;
  siteBarPrimary?: SiteBarPrimaryType;
  seo?: NextSeoProps;
  dataFooter: FooterDataType;
  alert?: {
    tel?: string;
    title: string;
  };
};

export type Props = FC<FunctionComponentDiv & SpecialProps>;
