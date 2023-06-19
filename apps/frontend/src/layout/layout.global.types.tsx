import { FC } from 'react';
import { NextSeoProps } from 'next-seo';
import type { FunctionComponentDiv } from 'uxu-utils';
import type { SiteBarPrimaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import type { SiteBarSecondaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';
import type { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';

export type SpecialProps = {
  topElement?: JSX.Element | JSX.Element[];
  siteBarSecondary?: SiteBarSecondaryDataTypes;
  siteBarPrimary?: SiteBarPrimaryDataTypes;
  seo?: NextSeoProps;
  dataFooter: FooterDataType;
  alert?: {
    tel?: string | null;
    title: string | null;
  };
};

export type ComponentLayoutDataType = FC<FunctionComponentDiv & SpecialProps>;
