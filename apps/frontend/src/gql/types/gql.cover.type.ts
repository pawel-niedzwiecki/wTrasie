export type FRAGMENT_COVER = {
  __typename: string;
  data: {
    __typename: string;
    id: string;
    attributes: {
      caption: string | null;
      alternativeText: string | null;
      formats: {
        large?: FRAGMENT_COVER_FORMAT;
        small?: FRAGMENT_COVER_FORMAT;
        medium?: FRAGMENT_COVER_FORMAT;
        thumbnail?: FRAGMENT_COVER_FORMAT;
      };
    };
  };
};

export type FRAGMENT_COVER_FORMAT = {
  ext: string;
  url: string | null;
  hash: string | null;
  mime: string | null;
  name: string | null;
  path: string | null;
  size: number;
  width: number;
  height: number;
} | null;
