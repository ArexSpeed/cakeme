import Layout from 'components/Layout';
import PremiumCard from 'components/PremiumCard';
import { getSession } from 'next-auth/client';
import { getHighlights } from 'services/highlights/getHighlights';
import { getUserHighlights } from 'services/users/highlights';
import { getUserPayments } from 'services/payments/getPayment';

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
  const userPayments = await getUserPayments(session.user.email);

  return {
    props: {
      userHighlights,
      highlightsOffers,
      userPayments
    }
  };
};

const PremiumSite = ({ highlightsOffers, userHighlights, userPayments }) => {
  return (
    <Layout>
      <section className="section">
        Buy highlights for your products and get higher on the search engine!
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
        <h5>
          *It is currently a test payment, it will not take your money, if you want to check this
          payment fill a random data and a card number 4242 4242 4242 4242
        </h5>
      </section>
      <section className="section">
        <h2>All my payments</h2>
        <table className="table">
          <tr>
            <th>ID</th>
            <th>Offer name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
          {userPayments.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.highlightName}</td>
              <td>{item.stripeCheckoutStatus}</td>
              <td>{item.createdDate.substr(0, 10)}</td>
            </tr>
          ))}
        </table>
      </section>
    </Layout>
  );
};

export default PremiumSite;
