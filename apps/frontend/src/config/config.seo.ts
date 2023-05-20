import { DefaultSeoProps } from 'next-seo';
import { NextRouter } from 'next/router';


export const DEFAULT_SEO = (router: NextRouter): DefaultSeoProps => ({
  openGraph: {
    url: `https://wtrasie.pl/${router.asPath}`,
    title: 'wTrasie - Wszystko co ważne w trasie',
    description:
      'wTrasie.pl - W Trasie, informacje prosto z trasy i ulic Twojego miasta. informacje na temat wypadków, wydarzeń oraz firm przydatnych w trasie',
    type: 'website',
    locale: 'pl',
    images: [{ url: 'https://wtrasie.pl/ogWTrasie.png' }],
  },
  title: 'wTrasie - Wszystko co ważne w trasie',
  description:
    'wTrasie.pl - W Trasie, informacje prosto z trasy i ulic Twojego miasta. Infomracje na temat wypadków, wydarzeń oraz firm przydatnych w trasie',
});
