import App, { AppProps , AppContext} from 'next/app';
import { WrapperProviders } from 'providers';
import 'uxu-utils/libs/design-system/src/lib/style/globalStyle.scss'

function CustomApp({ Component, pageProps, clientLocale, isMobilePlatform, osInfo }: AppProps & { clientLocale: string, isMobilePlatform: boolean, osInfo: { isWindows: boolean, isLinux: boolean, isMacOS: boolean } }) {
  return (
      <main className='app'>
        <WrapperProviders clientLocale={clientLocale} isMobilePlatform={isMobilePlatform} osInfo={osInfo}>
          <Component {...pageProps} />
        </WrapperProviders>
      </main>
  );
}

CustomApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const { ctx } = appContext;

  let clientLocale = 'default-locale';
  let userAgent = 'default-user-agent';

  if (ctx.req && ctx.req.headers) {
    clientLocale = ctx.req.headers["accept-language"] || clientLocale;
    userAgent = ctx.req.headers['user-agent'] || userAgent;
  } else if (typeof navigator !== 'undefined') {
    clientLocale = navigator.language;
    userAgent = navigator.userAgent;
  }

  const isMobilePlatform = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
  const isWindows = /Windows NT/i.test(userAgent);
  const isLinux = /Linux/i.test(userAgent) && !/Android/i.test(userAgent);
  const isMacOS = /Mac OS X/i.test(userAgent);

  return { ...appProps, clientLocale, isMobilePlatform, osInfo: { isWindows, isLinux, isMacOS } };
}

export default CustomApp;
