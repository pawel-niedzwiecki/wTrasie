import React from 'react';
import { ApolloProvider } from '@apollo/client';
import {client} from 'config'


export const ApolloCLientProvider = ({ children }) => (<ApolloProvider client={client}>{children}</ApolloProvider>);
