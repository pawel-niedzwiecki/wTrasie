import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { DEFAULT_SEO } from 'config';
import { FC } from 'react';
import { FunctionComponentDiv } from 'uxu-utils';


type Props = FC<FunctionComponentDiv>
export const SEOProvider: Props = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <DefaultSeo {...DEFAULT_SEO(router)} />
      {children}
    </>
  );
};

