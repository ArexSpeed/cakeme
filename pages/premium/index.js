import Layout from 'components/Layout';
import PremiumCard from 'components/PremiumCard';
import { getHighlights } from 'services/highlights/getHighlights';

export const getStaticProps = async () => {
  const highlightsOffers = await getHighlights();

  return {
    props: {
      highlightsOffers
    }
  };
};

const PremiumSite = ({ highlightsOffers }) => {
  return (
    <Layout>
      <section className="section">
        Buy highlights for your products and get more prominent on the search engine!
      </section>
      <section className="section">Actually you have 0 highlights</section>
      <section className="section">
        {highlightsOffers.map((offer, i) => (
          <PremiumCard key={i} item={offer} />
        ))}
      </section>
    </Layout>
  );
};

export default PremiumSite;
