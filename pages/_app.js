import Head from 'next/head';
import { Provider } from 'next-auth/client';
import { ContextProvider } from 'context/ContextProvider';
import reducer, { initialState } from 'context/reducer';
import '../styles/Styles.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ContextProvider reducer={reducer} initialState={initialState}>
        <Head>
          <title>Cake Me</title>
          <meta name="description" content="Cake me site" />
        </Head>
        <body>
          <Component {...pageProps} />
        </body>
      </ContextProvider>
    </Provider>
  );
}

export default MyApp;
