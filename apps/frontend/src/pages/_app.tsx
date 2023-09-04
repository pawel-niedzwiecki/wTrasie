import App, { AppProps , AppContext} from 'next/app';
import { WrapperProviders } from 'providers';
import 'uxu-utils/libs/design-system/src/lib/style/globalStyle.scss'

function CustomApp({ Component, pageProps, clientLocale, isMobilePlatform  }: AppProps & { clientLocale: string, isMobilePlatform: boolean }) {
  return (
      <main className='app'>
        <WrapperProviders clientLocale={clientLocale} isMobilePlatform={isMobilePlatform}>
          <Component {...pageProps} />
        </WrapperProviders>
      </main>
  );
}

CustomApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const { ctx } = appContext;
  const clientLocale = ctx.req ? ctx.req.headers["accept-language"] : navigator.language;
  const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;
  const isMobilePlatform = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));

  return { ...appProps, clientLocale, isMobilePlatform };
}

export default CustomApp;
