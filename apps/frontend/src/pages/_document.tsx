/* eslint-disable react/display-name */
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    const sheet = new ServerStyleSheet();

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        enhanceComponent: Component => Component,
      });

    const intialProps = await Document.getInitialProps(ctx);
    const styles = sheet.getStyleElement();

    return { ...intialProps, styles };
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.styles}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MC3DNS7');`,
            }}
          />
        </Head>
        <body>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MC3DNS7" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
