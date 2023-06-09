import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#000000" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={undefined} />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;600;700;800&family=Poppins:wght@100;400;600;700;800&family=Syne:wght@400;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="SparkFi is an incubation hub for the next generation project." />
          <meta name="robots" content="index, follow" />
          <meta name="keywords" content="launchpad, sparkfi, base" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
