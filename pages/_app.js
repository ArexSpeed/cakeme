import Head from 'next/head';
import { Provider } from 'next-auth/client';
import '../styles/Styles.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Cake Me</title>
        <meta name="description" content="Cake me site" />
      </Head>
      <body>
        <Component {...pageProps} />
      </body>
    </Provider>
  );
}

export default MyApp;
