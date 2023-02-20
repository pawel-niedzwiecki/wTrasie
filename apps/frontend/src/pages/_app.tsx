import { AppProps } from 'next/app';
import Head from 'next/head';
import { WrapperProvider } from '@uxu-utils';
import { ApolloCLientProvider } from 'providers';


function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className='app'>
        <WrapperProvider>
          <ApolloCLientProvider>
            <Component {...pageProps} />
          </ApolloCLientProvider>
        </WrapperProvider>
      </main>
    </>
  );
}

export default CustomApp;
