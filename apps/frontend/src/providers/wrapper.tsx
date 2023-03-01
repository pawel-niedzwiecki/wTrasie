import React from 'react';
import { ApolloCLientProvider } from './apollo';
import { GlobalStyle, theme } from 'uxu-utils';
import { ThemeProvider } from 'styled-components';

type Props = { children: JSX.Element | JSX.Element[] };


export const WrapperProviders = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ApolloCLientProvider>{children}</ApolloCLientProvider>
    </ThemeProvider>
  );
};
