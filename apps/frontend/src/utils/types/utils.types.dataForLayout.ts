import { NextSeoProps } from 'next-seo';
import { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';
import { SiteBarPrimaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/atoms/siteBar/primary/component.siteBar.primary.types';
import { SiteBarSecondaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/atoms/siteBar/secondary/component.siteBar.types';

export type DataForLayout = {
  seo: NextSeoProps | null;
  dataFooter: FooterDataType | null;
  siteBarPrimary: SiteBarPrimaryDataTypes | null;
  siteBarSecondary: SiteBarSecondaryDataTypes | null;
};
