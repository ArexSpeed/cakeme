import Layout from 'components/Layout';
import { ThemeProvider } from 'styled-components';
// import Head from 'next/head'
// import styles from '../styles/Home.module.css'

const theme = {
  primary: '#dc934f',
  white: '#ffffff',
  bgPrimary: '#e7dcdc'
};

export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <body>
          <Layout>Cake Me</Layout>
        </body>
      </ThemeProvider>
    </>
  );
}
