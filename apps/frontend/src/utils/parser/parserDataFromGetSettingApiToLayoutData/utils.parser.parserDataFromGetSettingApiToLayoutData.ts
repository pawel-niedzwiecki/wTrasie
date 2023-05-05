import type { SpecialProps as SiteBarPrimaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/primary/component.siteBar.primary.types';
import type { SpecialProps as SiteBarSecondaryType } from 'uxu-utils/libs/design-system/src/lib/components/templates/siteBar/secondary/component.siteBar.types';
import type { FooterDataType } from 'uxu-utils/libs/design-system/src/lib/components/templates/footer/component.footer.types';
import { FragmentDataFooterFragment, GetSettingPageQuery } from 'gql';
import { createSlugForType } from '../../function';
import { GetDataTypes, ParserDataForFilterTypes, ParserDataForFooterTypes, ParserDataForSeoTypes, ParserDataForSocialMediaTypes } from './utils.parser.parserDataFromGetSettingApiToLayoutData.types';

export class ParserDataFromGetSettingApiToLayoutData {
  isLoading: boolean;
  slug: string;
  ads: boolean;
  data: GetSettingPageQuery;
  alert?: {
    tel?: string;
    title?: string;
  };
  seo: { title?: string; description?: string };
  dataFooter: FooterDataType;
  siteBarPrimary: SiteBarPrimaryType;
  siteBarSecondary: SiteBarSecondaryType;

  constructor({
    data,
    slug,
    ads = true,
    isLoading = false,
    seo = {},
    alert = {},
  }: {
    data: GetSettingPageQuery;
    slug: string;
    ads?: boolean;
    isLoading?: boolean;
    alert?: {
      tel?: string;
      title?: string;
    };
    seo?: { title?: string; description?: string };
  }) {
    this.isLoading = isLoading;
    this.ads = ads;
    this.slug = slug;
    this.data = data;
    this.seo = seo;
    this.alert = alert;
    this.siteBarPrimary = { socialMedia: { isLoading, list: [] }, filter: { isLoading, links: [] } };
    this.siteBarSecondary = { ads };
    this.dataFooter = { columns: [] };
  }

  parserDataForAds() {
    this.siteBarSecondary.ads = this.ads;
  }

  parserDataForFilter(links: ParserDataForFilterTypes) {
    if (!links) return null;
    this.siteBarPrimary.filter.isLoading = this.isLoading;
    this.siteBarPrimary.filter.links = links?.map(item => ({
      title: item.title,
      active: item.slug === this.slug,
      slug: item.slug === this.slug ? item.slug : `${createSlugForType('tag')}/${item.slug}${item.key ? `-${item.key}` : ''}`,
    }));
  }

  parserDataForSeo(seo?: ParserDataForSeoTypes) {
    seo?.title !== null && (this.seo.title = seo.title);
    seo?.description !== null && (this.seo.description = seo.description);
  }

  parserDataForSocialMedia(socialMedia?: ParserDataForSocialMediaTypes) {
    if (!socialMedia) return null;
    this.siteBarPrimary.socialMedia.isLoading = this.isLoading;
    this.siteBarPrimary.socialMedia.list = socialMedia?.map(item => ({ typ: item.typ, url: item.url }));
  }

  parserDataForFooter(columns?: ParserDataForFooterTypes) {
    if (!columns) return null;
    this.dataFooter.columns = columns.map((column: FragmentDataFooterFragment) => ({
      id: column?.id,
      header: column?.header,
      link: column?.link?.map(data => ({ id: data?.id, title: data?.title, url: data?.url })),
    }));
  }

  getData(): GetDataTypes {
    if (this.data?.setting?.data?.attributes) {
      const attributes = this.data?.setting?.data.attributes;
      !Object.keys(this.seo).length && this.parserDataForSeo(attributes?.settingsPages[0]?.seo);
      this.parserDataForSocialMedia(attributes?.socialMedia);
      this.parserDataForFooter(attributes.footer);
      this.parserDataForFilter(attributes.settingsPages[0]?.filter);
    }
    this.parserDataForAds();

    const data = {
      seo: this.seo,
      dataFooter: this.dataFooter,
      siteBarPrimary: this.siteBarPrimary,
      siteBarSecondary: this.siteBarSecondary,
    };

    Object.keys(this.alert).length > 1 && (data['alert'] = this.alert);

    return data;
  }
}
