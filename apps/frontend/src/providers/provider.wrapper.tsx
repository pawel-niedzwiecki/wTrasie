import React from 'react';
import { SEOProvider } from './provider.seo';
import { ApolloCLientProvider } from './provider.apollo';
import { theme } from 'uxu-utils';
import { ThemeProvider } from 'styled-components';

type Props = { children: JSX.Element | JSX.Element[] };


export const WrapperProviders = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <SEOProvider>
        <ApolloCLientProvider>{children}</ApolloCLientProvider>
      </SEOProvider>
    </ThemeProvider>
  );
};
