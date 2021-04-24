import CardItem from 'components/CardItem';
import Layout from 'components/Layout';
import Search from 'components/Search';

export default function Home() {
  return (
    <>
      <Layout>
        <main className="main">
          <section className="search">
            <Search />
          </section>
          <p className="cards">All Products: </p>
          <section className="cards">
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
          </section>
        </main>
      </Layout>
    </>
  );
}
