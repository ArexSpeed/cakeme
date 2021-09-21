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

const CheckIcon = () => (
  <svg
    className="premium__table-icon"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PremiumSite = ({ highlightsOffers, userHighlights, userPayments }) => {
  return (
    <Layout>
      <section className="section">
        <div className="premium__table">
          <h2 className="premium__table-title">What does highlight products get you?</h2>
          <span className="premium__table-span">
            <CheckIcon />
            better search experiences
          </span>
          <span className="premium__table-span">
            <CheckIcon /> higher on products list
          </span>
          <span className="premium__table-span">
            <CheckIcon /> get more clients
          </span>
          <span className="premium__table-span">
            <CheckIcon /> more products recomendation
          </span>
          <span className="premium__table-span">
            <CheckIcon /> promotion mode
          </span>
          <span className="premium__table-span">
            <CheckIcon /> product highlight for 30 days
          </span>
          <h3 className="premium__table-subtitle">
            Select one of highlight tickets and improve your sales
          </h3>
        </div>
      </section>
      <section className="section">
        <p>
          Currently you have <span className="section__highlight">{userHighlights}</span> highlights
        </p>
      </section>
      <section className="section">
        {highlightsOffers.map((offer, i) => (
          <PremiumCard key={i} item={offer} highlightQty={userHighlights} />
        ))}
        <span style={{ fontSize: '12px' }}>
          *It is currently a test payment, it will not take your money, if you want to check this
          payment fill a random data and a card number 4242 4242 4242 4242
        </span>
      </section>
      <section className="section">
        <h2>All my payments</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Offer name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userPayments.map((item, i) => (
              <tr key={i}>
                <td className="td__product-id">{item.id}</td>
                <td className="td__product-name">{item.highlightName}</td>
                <td className="td__product-date">{item.createdDate.substr(0, 10)}</td>
                <td className="td__product-status">
                  <span
                    className={`${item.stripeCheckoutStatus === 'succeeded' ? 'correct' : 'fail'}`}>
                    {item.stripeCheckoutStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
};

export default PremiumSite;
