import { FC } from 'react';
import { NextSeoProps } from 'next-seo';
import type { FunctionComponentDiv } from 'uxu-utils';
import type {
  SpecialProps as SiteBarType,
} from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/component.siteBar.props';

export type SpecialProps = {
  siteBar?: SiteBarType,
  seo?: NextSeoProps | null
}

export type Props = FC<FunctionComponentDiv & SpecialProps>

