import { NextSeoProps } from 'next-seo';
import { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';
import { SiteBarPrimaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import { SiteBarSecondaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';

export type DataForLayout = {
  seo: NextSeoProps;
  dataFooter: FooterDataType;
  siteBarPrimary: SiteBarPrimaryDataTypes;
  siteBarSecondary: SiteBarSecondaryDataTypes;
};
