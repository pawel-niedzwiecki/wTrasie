import { Enum_Componentotherslink_Rel, Enum_Componentotherslink_Target, Enum_Componentotherspagessocialmedia_Typ, Enum_Componentotherssitebarfilters_Typ } from 'gql/types/api-gateway.service.generated';
import { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';
import { SiteBarPrimaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import { SiteBarSecondaryDataTypes } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';

export type ParserDataForFilterTypes = Array<{
  __typename: string;
  id: string;
  key?: string | null;
  typ: Enum_Componentotherssitebarfilters_Typ;
  title: string;
  slug: string;
} | null>;

export type ParserDataForSeoTypes = { __typename: string; title?: string | null; description?: string | null };

export type ParserDataForSocialMediaTypes = Array<{
  __typename: string;
  id: string;
  typ?: Enum_Componentotherspagessocialmedia_Typ | null;
  url: string;
} | null>;

export type ParserDataForFooterTypes = Array<
  | {
      __typename: 'ComponentFooterColumn';
      id: string;
      header?: string | null;
      link?: Array<{
        __typename?: 'ComponentOthersLink';
        id: string;
        url?: string | null;
        rel?: Enum_Componentotherslink_Rel | null;
        title?: string | null;
        target?: Enum_Componentotherslink_Target | null;
      } | null> | null;
    }
  | { __typename?: 'Error' }
  | null
>;

export type GetDataTypes = {
  seo: { title?: string; description?: string };
  dataFooter: FooterDataType;
  siteBarPrimary: SiteBarPrimaryDataTypes;
  siteBarSecondary: SiteBarSecondaryDataTypes;
};
