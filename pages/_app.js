import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import '../styles/globals.css';

const theme = {
  primary: '#dc934f',
  white: '#ffffff',
  blue: '#182D56',
  bgPrimary: '#e7dcdc',
  bgSecondary: '#DDB086'
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Cake Me</title>
        <meta name="description" content="Cake me site" />
      </Head>
      <body>
        <Component {...pageProps} />
      </body>
    </ThemeProvider>
  );
}

export default MyApp;
