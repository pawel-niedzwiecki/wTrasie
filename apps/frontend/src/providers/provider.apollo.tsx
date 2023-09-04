import React, { PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';
import { APOLLO_CLIENT } from 'config'


type ApolloCLientProviderProps = PropsWithChildren
export const ApolloCLientProvider = ({ children }: ApolloCLientProviderProps) => (<ApolloProvider client={APOLLO_CLIENT}>{children}</ApolloProvider>);
