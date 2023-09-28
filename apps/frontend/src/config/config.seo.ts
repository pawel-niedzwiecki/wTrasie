import { DefaultSeoProps } from 'next-seo';


type SegoConfigDefaultProps = {
  locale?: string;
  url?: string;
  title?: string;
  description?: string;
  defaultCover?: string;
}

export const SEO_CONFIG_DEFAULT = ({locale, url, title, description, defaultCover}: SegoConfigDefaultProps): DefaultSeoProps => ({
  openGraph: {
    url,
    title,
    description,
    type: 'website',
    locale,
    images: [{ url: defaultCover }],
  },
  title,
  description,
});
