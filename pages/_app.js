import Head from 'next/head';
import '../styles/Styles.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cake Me</title>
        <meta name="description" content="Cake me site" />
      </Head>
      <body>
        <Component {...pageProps} />
      </body>
    </>
  );
}

export default MyApp;
