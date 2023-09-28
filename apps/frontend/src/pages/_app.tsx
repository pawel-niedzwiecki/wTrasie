import App, { AppProps , AppContext } from 'next/app';
import { WrapperProviders } from 'providers';
import 'uxu-utils/libs/design-system/src/lib/style/globalStyle.scss';
import MobileDetect from 'mobile-detect';

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

  const md = new MobileDetect(userAgent);
  const isMobilePlatform = md.mobile() != null; // Zwróci true dla urządzeń mobilnych
  const isWindows = md.os() === 'WindowsPhoneOS' || md.os() === 'WindowsMobileOS' || md.userAgent() === 'Windows';
  const isLinux = md.os() === 'AndroidOS' || md.os() === 'Linux';
  const isMacOS = md.os() === 'iOS';

  return { ...appProps, clientLocale, isMobilePlatform, osInfo: { isWindows, isLinux, isMacOS } };
}

export default CustomApp;
