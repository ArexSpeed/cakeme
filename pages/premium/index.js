import Layout from 'components/Layout';
import PremiumCard from 'components/PremiumCard';
import { getSession } from 'next-auth/client';
import { getHighlights } from 'services/highlights/getHighlights';
import { getUserHighlights } from 'services/users/highlights';

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/user/login',
        permanent: false
      }
    };
  }

  const userHighlights = await getUserHighlights(session.user.email);
  const highlightsOffers = await getHighlights();

  return {
    props: {
      userHighlights,
      highlightsOffers
    }
  };
};

const PremiumSite = ({ highlightsOffers, userHighlights }) => {
  return (
    <Layout>
      <section className="section">
        Buy highlights for your products and get more prominent on the search engine!
      </section>
      <section className="section">
        <p>
          Currently you have <strong>{userHighlights}</strong> highlights
        </p>
      </section>
      <section className="section">
        {highlightsOffers.map((offer, i) => (
          <PremiumCard key={i} item={offer} highlightQty={userHighlights} />
        ))}
      </section>
    </Layout>
  );
};

export default PremiumSite;
