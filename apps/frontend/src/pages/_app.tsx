import App, { AppProps , AppContext} from 'next/app';
import { WrapperProviders } from 'providers';
import UAParser from 'ua-parser-js';
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

  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  const isMobilePlatform = result.device.type === 'mobile' || result.device.type === 'tablet';
  const isWindows = result.os.name === 'Windows';
  const isLinux = result.os.name === 'Linux';
  const isMacOS = result.os.name === 'Mac OS';

  return { ...appProps, clientLocale, isMobilePlatform, osInfo: { isWindows, isLinux, isMacOS } };
}

export default CustomApp;
