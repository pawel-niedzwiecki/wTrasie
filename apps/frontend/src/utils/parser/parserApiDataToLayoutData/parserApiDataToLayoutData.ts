import type {
  SiteBarPrimaryDataTypes
} from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import type {
  SiteBarSecondaryDataTypes
} from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';
import type {
  FooterDataType
} from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';
import { FragmentDataFooterFragment, GetSettingPageQuery } from 'gql';
import { createSlugForType } from '../../function';
import type { NextSeoProps } from 'next-seo'
import {
  GetDataTypes,
  ParserDataForFilterTypes,
  ParserDataForFooterTypes,
  ParserDataForSeoTypes,
  ParserDataForSocialMediaTypes
} from './parserApiDataToLayoutData.types';

export class ParserApiDataToLayoutData {
  constructor (
    private data: GetSettingPageQuery,
    private slug: string,
    private ads = true,
    private isLoading = false,
    private seo: NextSeoProps = {},
    private siteBarPrimary: SiteBarPrimaryDataTypes = {
      ads: null,
      cover: null,
      socialMedia: {isLoading, list: []},
      filter: {isLoading, links: []}
    },
    private siteBarSecondary: SiteBarSecondaryDataTypes = {ads},
    private dataFooter: FooterDataType = {columns: []}
  ) {
  }

  parserDataForAds () {
    this.siteBarSecondary.ads = this.ads;
  }

  parserDataForFilter (links: ParserDataForFilterTypes) {
    if ( !links ) return;
    this.siteBarPrimary.filter.isLoading = this.isLoading;
    this.siteBarPrimary.filter.links = links.map ( item => ({
      title: item?.title,
      active: item?.slug === this.slug,
      slug: item?.slug === this.slug ? item.slug : `${createSlugForType ( 'tag' )}/${item?.key ? `${item.key}/` : ``}${item.slug}`,
    }) );
  }

  parserDataForSeo ( seo: ParserDataForSeoTypes ) {
    this.seo.title = seo?.title ?? this.seo.title;
    this.seo.description = seo?.description ?? this.seo.description;
  }

  parserDataForSocialMedia ( socialMedia: ParserDataForSocialMediaTypes ) {
    if ( !socialMedia ) return;
    this.siteBarPrimary.socialMedia.isLoading = this.isLoading;
    this.siteBarPrimary.socialMedia.list = socialMedia.map ( item => ({typ: item.typ, url: item.url}) );
  }

  parserDataForFooter ( columns: ParserDataForFooterTypes ) {
    if ( !columns ) return;
    this.dataFooter.columns = columns.map ( ( column: FragmentDataFooterFragment ) => ({
      id: column?.id,
      header: column?.header,
      link: column?.link?.map ( data => ({id: data?.id, title: data?.title, url: data?.url, rel: null, target: null}) ),
    }) );
  }

  getData (): GetDataTypes {
    const attributes = this.data?.setting?.data?.attributes;
    if ( attributes ) {
      !Object.keys(this.seo).length && this.parserDataForSeo(attributes?.settingsPages[ 0 ]?.seo);
      this.parserDataForSocialMedia (attributes?.socialMedia);
      this.parserDataForFooter(attributes?.footer);
      this.parserDataForFilter(attributes.settingsPages[ 0 ].filter);
    }
    this.parserDataForAds ();

    return {
      seo: this.seo,
      dataFooter: this.dataFooter,
      siteBarPrimary: this.siteBarPrimary,
      siteBarSecondary: this.siteBarSecondary,
    };
  }
}
