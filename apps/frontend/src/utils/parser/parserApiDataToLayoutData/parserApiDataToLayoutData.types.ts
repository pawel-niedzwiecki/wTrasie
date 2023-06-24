import type { NextSeoProps } from 'next-seo'
import type { GetSettingPageQuery } from 'gql/types/gql.query.setting.generated.type'
import { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';
import { SiteBarPrimaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import { SiteBarSecondaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';


type NonNullableNested<T> = {
  [K in keyof T]: T[K] extends object ? NonNullableNested<NonNullable<T[K]>> : T[K];
};

type GetSettingPageQueryNonNull = NonNullableNested<GetSettingPageQuery>;

export type ParserDataForFilterTypes = Array<GetSettingPageQueryNonNull['setting']['data']['attributes']['settingsPages'][number]['filter'][number]>;

export type ParserDataForSeoTypes = GetSettingPageQuery['setting']['data']['attributes']['settingsPages'][number]['seo'];

export type ParserDataForSocialMediaTypes = Array<GetSettingPageQueryNonNull['setting']['data']['attributes']['socialMedia'][number]>;

export type ParserDataForFooterTypes = Array<GetSettingPageQueryNonNull['setting']['data']['attributes']['footer'][number]>;

export type GetDataTypes = {
  seo: NextSeoProps;
  dataFooter: FooterDataType;
  siteBarPrimary: SiteBarPrimaryDataTypes;
  siteBarSecondary: SiteBarSecondaryDataTypes;
};
