import { NextSeoProps } from 'next-seo';
import { PropsWithChildren } from "react";
import type { SiteBarPrimaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/atoms/siteBar/primary/component.siteBar.primary.types';
import type { SiteBarSecondaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/atoms/siteBar/secondary/component.siteBar.types';
import type { FooterProps } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/footer.types';

export type LayoutProps = PropsWithChildren<{
  topElement?: JSX.Element | JSX.Element[] | null;
  siteBarSecondary?: SiteBarSecondaryDataTypes | null;
  siteBarPrimary?: SiteBarPrimaryDataTypes | null;
  seo?: NextSeoProps | null;
  dataFooter?: FooterProps | null;
  alert?: {
    tel: string | null;
    title: string | null;
  } | null
}>;
