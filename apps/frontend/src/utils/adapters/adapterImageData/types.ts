

export type Format = {
  ext?: string | null;
  url?: string | null;
  hash?: string | null;
  mime?: string | null;
  name?: string | null;
  path?: string | null;
  size?: number | null;
  width?: number | null;
  height?: number | null;
}

export type AdapterImageDataProps = {
  attributes?: {
    url?: string | null;
    caption?: string | null;
    alternativeText?: string | null;
    formats?: {
      "small": Format;
      "medium": Format;
      "thumbnail": Format;
    }
  } | null
  typeImg: 'thumbnail' | 'small' | 'medium' | 'large' | 'url'
}
