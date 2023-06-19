import { AppProps } from 'next/app';
import Head from 'next/head';
import { WrapperProviders } from 'providers';
import 'uxu-utils/libs/design-system/src/lib/style/globalStyle.scss'


function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className='app'>
          <WrapperProviders>
            <Component {...pageProps} />
          </WrapperProviders>
      </main>
    </>
  );
}

export default CustomApp;
