import Layout from 'components/Layout';
import { getSession } from 'next-auth/client';
// import { getUser } from 'services/users/getUser';
// import isAuthorized from 'services/products/isAuthorized';
import { getUserHighlights } from 'services/users/highlights';
import { getUserPayments } from 'services/payments/getPayment';
import finalizeCheckout from 'services/checkout/finalize';

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

  const userPayments = await getUserPayments(session.user.email);
  const userHighlights = await getUserHighlights(session.user.email);
  const lastPaymentId = userPayments[0].id; //last payments
  console.log(lastPaymentId, 'payment');
  const newHighlightQty = +userPayments[0].highlightQty + +userHighlights;
  const { payment } = await finalizeCheckout(lastPaymentId, session.user.id, newHighlightQty);

  return {
    props: {
      userPayments,
      payment
    }
  };
};

export default function PaymentStatus({ userPayments, payment }) {
  return (
    <Layout>
      <section className="section">
        {payment.stripeCheckoutStatus === 'succeeded' ? (
          <div className="actionInfo">Your payment is succeeded</div>
        ) : (
          <div className="actionInfo red">Something was wrong with your payment</div>
        )}
        <h2>All my payments</h2>
        <table className="table">
          <tr>
            <th>Offer name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
          {userPayments.map((item, i) => (
            <tr key={i}>
              <td>{item.highlightName}</td>
              <td>{item.stripeCheckoutStatus}</td>
              <td>{item.createdDate.substr(0, 10)}</td>
            </tr>
          ))}
        </table>
      </section>
    </Layout>
  );
}
