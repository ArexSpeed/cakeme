import CardItem from 'components/CardItem';
import Layout from 'components/Layout';
import Search from 'components/Search';
import useSWR from 'swr';
import getOffers from 'services/offers/getOffers';
import { jsonFetcher } from 'utils';

export const getStaticProps = async () => {
  const offers = await getOffers();

  return {
    props: {
      offers
    }
  };
};

export default function Home({ offers }) {
  const { data } = useSWR('/api/offers', jsonFetcher, { initialData: offers });

  return (
    <>
      <Layout>
        <main className="main">
          <section className="search">
            <Search />
          </section>
          <p className="cards">All Products: </p>
          <section className="cards">
            {data.map((item) => (
              <CardItem key={item.id} item={item} />
            ))}
          </section>
        </main>
      </Layout>
    </>
  );
}
