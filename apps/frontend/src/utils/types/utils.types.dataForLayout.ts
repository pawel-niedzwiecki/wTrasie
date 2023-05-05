import { NextSeoProps } from 'next-seo';
import { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';
import { SpecialProps as SiteBarPrimaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import { SpecialProps as SiteBarSecondaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';

export type DataForLayout = {
  seo: NextSeoProps;
  dataFooter: FooterDataType;
  siteBarPrimary: SiteBarPrimaryType;
  siteBarSecondary: SiteBarSecondaryType;
};
