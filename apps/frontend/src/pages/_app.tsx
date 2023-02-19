import { AppProps } from 'next/app';
import Head from 'next/head';
import { WrapperProvider } from '@uxu-utils';


function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className='app'>
        <WrapperProvider>
          <Component {...pageProps} />
        </WrapperProvider>
      </main>
    </>
  );
}

export default CustomApp;
