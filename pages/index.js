import CardItem from 'components/CardItem';
import Layout from 'components/Layout';
import { ThemeProvider } from 'styled-components';
// import Head from 'next/head'
// import styles from '../styles/Home.module.css'

const theme = {
  primary: '#dc934f',
  white: '#ffffff',
  blue: '#182D56',
  bgPrimary: '#e7dcdc',
  bgSecondary: '#DDB086'
};

export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <body>
          <Layout>
            <main className="main">
              <section className="cards">
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
              </section>
            </main>
          </Layout>
        </body>
      </ThemeProvider>
    </>
  );
}
