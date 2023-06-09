export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ArticleContentpartsDynamicZoneInput: any;
  DateTime: any;
  JSON: any;
  SettingFooterDynamicZoneInput: any;
  TagContentpartsDynamicZoneInput: any;
  Upload: any;
};

export type Article = {
  __typename?: 'Article';
  author?: Maybe<UsersPermissionsUserEntityResponse>;
  contentparts: Array<Maybe<ArticleContentpartsDynamicZone>>;
  cover: UploadFileEntityResponse;
  createdAt?: Maybe<Scalars['DateTime']>;
  lead: ComponentContentPartsLead;
  publishedAt?: Maybe<Scalars['DateTime']>;
  seo: ComponentOthersSeo;
  tags?: Maybe<TagRelationResponseCollection>;
  title: Scalars['String'];
  type: Enum_Article_Type;
  updatedAt?: Maybe<Scalars['DateTime']>;
  views: ComponentStatsViews;
};


export type ArticleTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ArticleContentpartsDynamicZone = ComponentContentPartsMedia | ComponentContentPartsQuote | ComponentContentPartsTxt | ComponentContentPartsYoutube | Error;

export type ArticleEntity = {
  __typename?: 'ArticleEntity';
  attributes?: Maybe<Article>;
  id?: Maybe<Scalars['ID']>;
};

export type ArticleEntityResponse = {
  __typename?: 'ArticleEntityResponse';
  data?: Maybe<ArticleEntity>;
};

export type ArticleEntityResponseCollection = {
  __typename?: 'ArticleEntityResponseCollection';
  data: Array<ArticleEntity>;
  meta: ResponseCollectionMeta;
};

export type ArticleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
  author?: InputMaybe<UsersPermissionsUserFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lead?: InputMaybe<ComponentContentPartsLeadFiltersInput>;
  not?: InputMaybe<ArticleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentOthersSeoFiltersInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  views?: InputMaybe<ComponentStatsViewsFiltersInput>;
};

export type ArticleInput = {
  author?: InputMaybe<Scalars['ID']>;
  contentparts?: InputMaybe<Array<Scalars['ArticleContentpartsDynamicZoneInput']>>;
  cover?: InputMaybe<Scalars['ID']>;
  lead?: InputMaybe<ComponentContentPartsLeadInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<ComponentOthersSeoInput>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Article_Type>;
  views?: InputMaybe<ComponentStatsViewsInput>;
};

export type ArticleRelationResponseCollection = {
  __typename?: 'ArticleRelationResponseCollection';
  data: Array<ArticleEntity>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  eqi?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type Client = {
  __typename?: 'Client';
  branches?: Maybe<Array<Maybe<ComponentOthersAdress>>>;
  companyData?: Maybe<ComponentOthersCompanyData>;
  createdAt?: Maybe<Scalars['DateTime']>;
  pagesAndSocialMedia?: Maybe<Array<Maybe<ComponentOthersPagesSocialMedia>>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ClientBranchesArgs = {
  filters?: InputMaybe<ComponentOthersAdressFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ClientPagesAndSocialMediaArgs = {
  filters?: InputMaybe<ComponentOthersPagesSocialMediaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ClientEntity = {
  __typename?: 'ClientEntity';
  attributes?: Maybe<Client>;
  id?: Maybe<Scalars['ID']>;
};

export type ClientEntityResponse = {
  __typename?: 'ClientEntityResponse';
  data?: Maybe<ClientEntity>;
};

export type ClientEntityResponseCollection = {
  __typename?: 'ClientEntityResponseCollection';
  data: Array<ClientEntity>;
  meta: ResponseCollectionMeta;
};

export type ClientFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ClientFiltersInput>>>;
  branches?: InputMaybe<ComponentOthersAdressFiltersInput>;
  companyData?: InputMaybe<ComponentOthersCompanyDataFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ClientFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ClientFiltersInput>>>;
  pagesAndSocialMedia?: InputMaybe<ComponentOthersPagesSocialMediaFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ClientInput = {
  branches?: InputMaybe<Array<InputMaybe<ComponentOthersAdressInput>>>;
  companyData?: InputMaybe<ComponentOthersCompanyDataInput>;
  pagesAndSocialMedia?: InputMaybe<Array<InputMaybe<ComponentOthersPagesSocialMediaInput>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ComponentContentPartsLead = {
  __typename?: 'ComponentContentPartsLead';
  id: Scalars['ID'];
  lead: Scalars['String'];
};

export type ComponentContentPartsLeadFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentContentPartsLeadFiltersInput>>>;
  lead?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentContentPartsLeadFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentContentPartsLeadFiltersInput>>>;
};

export type ComponentContentPartsLeadInput = {
  id?: InputMaybe<Scalars['ID']>;
  lead?: InputMaybe<Scalars['String']>;
};

export type ComponentContentPartsMaps = {
  __typename?: 'ComponentContentPartsMaps';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type ComponentContentPartsMapsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentContentPartsMapsFiltersInput>>>;
  not?: InputMaybe<ComponentContentPartsMapsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentContentPartsMapsFiltersInput>>>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentContentPartsMapsInput = {
  id?: InputMaybe<Scalars['ID']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentContentPartsMedia = {
  __typename?: 'ComponentContentPartsMedia';
  id: Scalars['ID'];
  media: UploadFileEntityResponse;
};

export type ComponentContentPartsQuote = {
  __typename?: 'ComponentContentPartsQuote';
  id: Scalars['ID'];
  quote: Scalars['String'];
};

export type ComponentContentPartsTxt = {
  __typename?: 'ComponentContentPartsTxt';
  id: Scalars['ID'];
  txt: Scalars['String'];
};

export type ComponentContentPartsYouTube = {
  __typename?: 'ComponentContentPartsYouTube';
  gallery: UploadFileRelationResponseCollection;
  id: Scalars['ID'];
};


export type ComponentContentPartsYouTubeGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentContentPartsYoutube = {
  __typename?: 'ComponentContentPartsYoutube';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type ComponentFooterColumn = {
  __typename?: 'ComponentFooterColumn';
  header?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  link?: Maybe<Array<Maybe<ComponentOthersLink>>>;
};


export type ComponentFooterColumnLinkArgs = {
  filters?: InputMaybe<ComponentOthersLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentOthersAdress = {
  __typename?: 'ComponentOthersAdress';
  apartmentNumber?: Maybe<Scalars['String']>;
  emails?: Maybe<Array<Maybe<ComponentOthersEmail>>>;
  googleMaps?: Maybe<ComponentContentPartsMaps>;
  id: Scalars['ID'];
  numberStreet: Scalars['String'];
  phones?: Maybe<Array<Maybe<ComponentOthersPhone>>>;
  postCode: Scalars['String'];
  shortname?: Maybe<TagEntityResponse>;
  street: Scalars['String'];
  typ?: Maybe<Enum_Componentothersadress_Typ>;
};


export type ComponentOthersAdressEmailsArgs = {
  filters?: InputMaybe<ComponentOthersEmailFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentOthersAdressPhonesArgs = {
  filters?: InputMaybe<ComponentOthersPhoneFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentOthersAdressFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOthersAdressFiltersInput>>>;
  apartmentNumber?: InputMaybe<StringFilterInput>;
  emails?: InputMaybe<ComponentOthersEmailFiltersInput>;
  googleMaps?: InputMaybe<ComponentContentPartsMapsFiltersInput>;
  not?: InputMaybe<ComponentOthersAdressFiltersInput>;
  numberStreet?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOthersAdressFiltersInput>>>;
  phones?: InputMaybe<ComponentOthersPhoneFiltersInput>;
  postCode?: InputMaybe<StringFilterInput>;
  shortname?: InputMaybe<TagFiltersInput>;
  street?: InputMaybe<StringFilterInput>;
  typ?: InputMaybe<StringFilterInput>;
};

export type ComponentOthersAdressInput = {
  apartmentNumber?: InputMaybe<Scalars['String']>;
  emails?: InputMaybe<Array<InputMaybe<ComponentOthersEmailInput>>>;
  googleMaps?: InputMaybe<ComponentContentPartsMapsInput>;
  id?: InputMaybe<Scalars['ID']>;
  numberStreet?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<ComponentOthersPhoneInput>>>;
  postCode?: InputMaybe<Scalars['String']>;
  shortname?: InputMaybe<Scalars['ID']>;
  street?: InputMaybe<Scalars['String']>;
  typ?: InputMaybe<Enum_Componentothersadress_Typ>;
};

export type ComponentOthersCompanyData = {
  __typename?: 'ComponentOthersCompanyData';
  companyName: Scalars['String'];
  id: Scalars['ID'];
  krs?: Maybe<Scalars['String']>;
  nip: Scalars['String'];
  regon?: Maybe<Scalars['String']>;
  typ?: Maybe<Enum_Componentotherscompanydata_Typ>;
};

export type ComponentOthersCompanyDataFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOthersCompanyDataFiltersInput>>>;
  companyName?: InputMaybe<StringFilterInput>;
  krs?: InputMaybe<StringFilterInput>;
  nip?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentOthersCompanyDataFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOthersCompanyDataFiltersInput>>>;
  regon?: InputMaybe<StringFilterInput>;
  typ?: InputMaybe<StringFilterInput>;
};

export type ComponentOthersCompanyDataInput = {
  companyName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  krs?: InputMaybe<Scalars['String']>;
  nip?: InputMaybe<Scalars['String']>;
  regon?: InputMaybe<Scalars['String']>;
  typ?: InputMaybe<Enum_Componentotherscompanydata_Typ>;
};

export type ComponentOthersEmail = {
  __typename?: 'ComponentOthersEmail';
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type ComponentOthersEmailFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOthersEmailFiltersInput>>>;
  email?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentOthersEmailFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOthersEmailFiltersInput>>>;
};

export type ComponentOthersEmailInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ComponentOthersLink = {
  __typename?: 'ComponentOthersLink';
  id: Scalars['ID'];
  rel?: Maybe<Enum_Componentotherslink_Rel>;
  target?: Maybe<Enum_Componentotherslink_Target>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentOthersLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOthersLinkFiltersInput>>>;
  not?: InputMaybe<ComponentOthersLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOthersLinkFiltersInput>>>;
  rel?: InputMaybe<StringFilterInput>;
  target?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentOthersLinksList = {
  __typename?: 'ComponentOthersLinksList';
  id: Scalars['ID'];
  link: Array<Maybe<ComponentOthersLink>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentOthersLinksListLinkArgs = {
  filters?: InputMaybe<ComponentOthersLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentOthersPagesSocialMedia = {
  __typename?: 'ComponentOthersPagesSocialMedia';
  id: Scalars['ID'];
  typ?: Maybe<Enum_Componentotherspagessocialmedia_Typ>;
  url: Scalars['String'];
};

export type ComponentOthersPagesSocialMediaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOthersPagesSocialMediaFiltersInput>>>;
  not?: InputMaybe<ComponentOthersPagesSocialMediaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOthersPagesSocialMediaFiltersInput>>>;
  typ?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentOthersPagesSocialMediaInput = {
  id?: InputMaybe<Scalars['ID']>;
  typ?: InputMaybe<Enum_Componentotherspagessocialmedia_Typ>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentOthersPhone = {
  __typename?: 'ComponentOthersPhone';
  id: Scalars['ID'];
  phone: Scalars['String'];
  typ?: Maybe<Enum_Componentothersphone_Typ>;
};

export type ComponentOthersPhoneFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOthersPhoneFiltersInput>>>;
  not?: InputMaybe<ComponentOthersPhoneFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOthersPhoneFiltersInput>>>;
  phone?: InputMaybe<StringFilterInput>;
  typ?: InputMaybe<StringFilterInput>;
};

export type ComponentOthersPhoneInput = {
  id?: InputMaybe<Scalars['ID']>;
  phone?: InputMaybe<Scalars['String']>;
  typ?: InputMaybe<Enum_Componentothersphone_Typ>;
};

export type ComponentOthersSeo = {
  __typename?: 'ComponentOthersSeo';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentOthersSeoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOthersSeoFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentOthersSeoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOthersSeoFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentOthersSeoInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentOthersSettingPage = {
  __typename?: 'ComponentOthersSettingPage';
  filter: Array<Maybe<ComponentOthersSiteBarFilters>>;
  id: Scalars['ID'];
  page: Scalars['String'];
  seo: ComponentOthersSeo;
};


export type ComponentOthersSettingPageFilterArgs = {
  filters?: InputMaybe<ComponentOthersSiteBarFiltersFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentOthersSettingPageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOthersSettingPageFiltersInput>>>;
  filter?: InputMaybe<ComponentOthersSiteBarFiltersFiltersInput>;
  not?: InputMaybe<ComponentOthersSettingPageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOthersSettingPageFiltersInput>>>;
  page?: InputMaybe<StringFilterInput>;
  seo?: InputMaybe<ComponentOthersSeoFiltersInput>;
};

export type ComponentOthersSettingPageInput = {
  filter?: InputMaybe<Array<InputMaybe<ComponentOthersSiteBarFiltersInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  page?: InputMaybe<Scalars['String']>;
  seo?: InputMaybe<ComponentOthersSeoInput>;
};

export type ComponentOthersSiteBarFilters = {
  __typename?: 'ComponentOthersSiteBarFilters';
  id: Scalars['ID'];
  key?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  typ: Enum_Componentotherssitebarfilters_Typ;
};

export type ComponentOthersSiteBarFiltersFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOthersSiteBarFiltersFiltersInput>>>;
  key?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentOthersSiteBarFiltersFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOthersSiteBarFiltersFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  typ?: InputMaybe<StringFilterInput>;
};

export type ComponentOthersSiteBarFiltersInput = {
  id?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  typ?: InputMaybe<Enum_Componentotherssitebarfilters_Typ>;
};

export type ComponentStatsViews = {
  __typename?: 'ComponentStatsViews';
  id: Scalars['ID'];
  views: Scalars['Int'];
};

export type ComponentStatsViewsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentStatsViewsFiltersInput>>>;
  not?: InputMaybe<ComponentStatsViewsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentStatsViewsFiltersInput>>>;
  views?: InputMaybe<IntFilterInput>;
};

export type ComponentStatsViewsInput = {
  id?: InputMaybe<Scalars['ID']>;
  views?: InputMaybe<Scalars['Int']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  eqi?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export enum Enum_Article_Type {
  Article = 'article',
  Service = 'service'
}

export enum Enum_Componentothersadress_Typ {
  Primmary = 'primmary',
  Secondary = 'secondary'
}

export enum Enum_Componentotherscompanydata_Typ {
  DzialalnoscGospodarcza = 'dzialalnosc_gospodarcza',
  SpolkaAkcyjna = 'spolka_akcyjna',
  SpolkaCywilna = 'spolka_cywilna',
  SpolkaZOgraniczonaOdpowiedzialnoscia = 'spolka_z_ograniczona_odpowiedzialnoscia'
}

export enum Enum_Componentotherslink_Rel {
  Alternate = 'alternate',
  Author = 'author',
  Bookmark = 'bookmark',
  Canonical = 'canonical',
  DnsPrefetch = 'dns_prefetch',
  External = 'external',
  Help = 'help',
  Icon = 'icon',
  License = 'license',
  Manifest = 'manifest',
  Me = 'me',
  Modulepreload = 'modulepreload',
  Next = 'next',
  Nofollow = 'nofollow',
  Noopener = 'noopener',
  Noreferrer = 'noreferrer',
  Opener = 'opener',
  Pingback = 'pingback',
  Preconnect = 'preconnect',
  Prefetch = 'prefetch',
  Preload = 'preload',
  Prerender = 'prerender',
  Prev = 'prev',
  Search = 'search',
  Stylesheet = 'stylesheet',
  Tag = 'tag'
}

export enum Enum_Componentotherslink_Target {
  Blank = 'blank',
  Parent = 'parent',
  Self = 'self',
  Top = 'top'
}

export enum Enum_Componentotherspagessocialmedia_Typ {
  Facebook = 'facebook',
  Page = 'page',
  Shop = 'shop',
  Tiktok = 'tiktok',
  Twitter = 'twitter',
  Youtube = 'youtube'
}

export enum Enum_Componentothersphone_Typ {
  Fax = 'fax',
  Home = 'home',
  Mobile = 'mobile'
}

export enum Enum_Componentotherssitebarfilters_Typ {
  Articles = 'articles',
  Clients = 'clients',
  Tags = 'tags',
  Users = 'users'
}

export enum Enum_Tag_Typ {
  City = 'city',
  Countie = 'countie',
  Other = 'other',
  Service = 'service'
}

export type Error = {
  __typename?: 'Error';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  eqi?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type GenericMorph = Article | Client | ComponentContentPartsLead | ComponentContentPartsMaps | ComponentContentPartsMedia | ComponentContentPartsQuote | ComponentContentPartsTxt | ComponentContentPartsYouTube | ComponentContentPartsYoutube | ComponentFooterColumn | ComponentOthersAdress | ComponentOthersCompanyData | ComponentOthersEmail | ComponentOthersLink | ComponentOthersLinksList | ComponentOthersPagesSocialMedia | ComponentOthersPhone | ComponentOthersSeo | ComponentOthersSettingPage | ComponentOthersSiteBarFilters | ComponentStatsViews | I18NLocale | Setting | Tag | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  eqi?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  eqi?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  eqi?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createArticle?: Maybe<ArticleEntityResponse>;
  createClient?: Maybe<ClientEntityResponse>;
  createTag?: Maybe<TagEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteArticle?: Maybe<ArticleEntityResponse>;
  deleteClient?: Maybe<ClientEntityResponse>;
  deleteSetting?: Maybe<SettingEntityResponse>;
  deleteTag?: Maybe<TagEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateArticle?: Maybe<ArticleEntityResponse>;
  updateClient?: Maybe<ClientEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateSetting?: Maybe<SettingEntityResponse>;
  updateTag?: Maybe<TagEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationCreateArticleArgs = {
  data: ArticleInput;
};


export type MutationCreateClientArgs = {
  data: ClientInput;
};


export type MutationCreateTagArgs = {
  data: TagInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  data: ArticleInput;
  id: Scalars['ID'];
};


export type MutationUpdateClientArgs = {
  data: ClientInput;
  id: Scalars['ID'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateSettingArgs = {
  data: SettingInput;
};


export type MutationUpdateTagArgs = {
  data: TagInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  article?: Maybe<ArticleEntityResponse>;
  articles?: Maybe<ArticleEntityResponseCollection>;
  client?: Maybe<ClientEntityResponse>;
  clients?: Maybe<ClientEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  search?: Maybe<SearchResponse>;
  setting?: Maybe<SettingEntityResponse>;
  tag?: Maybe<TagEntityResponse>;
  tags?: Maybe<TagEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryClientArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryClientsArgs = {
  filters?: InputMaybe<ClientFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QuerySearchArgs = {
  locale?: InputMaybe<Scalars['String']>;
  query: Scalars['String'];
};


export type QueryTagArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  articles?: Maybe<ArticleEntityResponseCollection>;
  tags?: Maybe<TagEntityResponseCollection>;
};

export type Setting = {
  __typename?: 'Setting';
  createdAt?: Maybe<Scalars['DateTime']>;
  footer: Array<Maybe<SettingFooterDynamicZone>>;
  settingsPages: Array<Maybe<ComponentOthersSettingPage>>;
  socialMedia: Array<Maybe<ComponentOthersPagesSocialMedia>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type SettingSettingsPagesArgs = {
  filters?: InputMaybe<ComponentOthersSettingPageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type SettingSocialMediaArgs = {
  filters?: InputMaybe<ComponentOthersPagesSocialMediaFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type SettingEntity = {
  __typename?: 'SettingEntity';
  attributes?: Maybe<Setting>;
  id?: Maybe<Scalars['ID']>;
};

export type SettingEntityResponse = {
  __typename?: 'SettingEntityResponse';
  data?: Maybe<SettingEntity>;
};

export type SettingFooterDynamicZone = ComponentFooterColumn | Error;

export type SettingInput = {
  footer?: InputMaybe<Array<Scalars['SettingFooterDynamicZoneInput']>>;
  settingsPages?: InputMaybe<Array<InputMaybe<ComponentOthersSettingPageInput>>>;
  socialMedia?: InputMaybe<Array<InputMaybe<ComponentOthersPagesSocialMediaInput>>>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  eqi?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  articles?: Maybe<ArticleRelationResponseCollection>;
  contentparts: Array<Maybe<TagContentpartsDynamicZone>>;
  cover: UploadFileEntityResponse;
  createdAt?: Maybe<Scalars['DateTime']>;
  lead: ComponentContentPartsLead;
  publishedAt?: Maybe<Scalars['DateTime']>;
  seo: ComponentOthersSeo;
  title: Scalars['String'];
  typ: Enum_Tag_Typ;
  updatedAt?: Maybe<Scalars['DateTime']>;
  views?: Maybe<ComponentStatsViews>;
};


export type TagArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TagContentpartsDynamicZone = ComponentContentPartsTxt | Error;

export type TagEntity = {
  __typename?: 'TagEntity';
  attributes?: Maybe<Tag>;
  id?: Maybe<Scalars['ID']>;
};

export type TagEntityResponse = {
  __typename?: 'TagEntityResponse';
  data?: Maybe<TagEntity>;
};

export type TagEntityResponseCollection = {
  __typename?: 'TagEntityResponseCollection';
  data: Array<TagEntity>;
  meta: ResponseCollectionMeta;
};

export type TagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  articles?: InputMaybe<ArticleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lead?: InputMaybe<ComponentContentPartsLeadFiltersInput>;
  not?: InputMaybe<TagFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  seo?: InputMaybe<ComponentOthersSeoFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  typ?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  views?: InputMaybe<ComponentStatsViewsFiltersInput>;
};

export type TagInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contentparts?: InputMaybe<Array<Scalars['TagContentpartsDynamicZoneInput']>>;
  cover?: InputMaybe<Scalars['ID']>;
  lead?: InputMaybe<ComponentContentPartsLeadInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<ComponentOthersSeoInput>;
  title?: InputMaybe<Scalars['String']>;
  typ?: InputMaybe<Enum_Tag_Typ>;
  views?: InputMaybe<ComponentStatsViewsInput>;
};

export type TagRelationResponseCollection = {
  __typename?: 'TagRelationResponseCollection';
  data: Array<TagEntity>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Scalars['ID']>;
  folderPath?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  pathId?: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  articles?: Maybe<ArticleRelationResponseCollection>;
  avatar?: Maybe<UploadFileEntityResponse>;
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};


export type UsersPermissionsUserArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  articles?: InputMaybe<ArticleFiltersInput>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  avatar?: InputMaybe<Scalars['ID']>;
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};
