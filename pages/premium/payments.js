import Layout from 'components/Layout';
import Link from 'next/link';
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

  const newHighlightQty = +userPayments[0].highlightQty + +userHighlights;
  const { payment } = await finalizeCheckout(lastPaymentId, session.user.id, newHighlightQty);

  return {
    props: {
      payment
    }
  };
};

export default function PaymentStatus({ payment }) {
  return (
    <Layout>
      <section className="section">
        {payment.stripeCheckoutStatus === 'succeeded' ? (
          <div className="actionInfo">Your payment is succeeded</div>
        ) : (
          <div className="actionInfo red">Something was wrong with your payment</div>
        )}
        <Link href="/premium">
          <button className="button">Back to premium</button>
        </Link>
      </section>
    </Layout>
  );
}
