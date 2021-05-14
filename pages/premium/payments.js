import Layout from 'components/Layout';
import { getSession } from 'next-auth/client';
import { getUser } from 'services/users/getUser';
import isAuthorized from 'services/products/isAuthorized';
import finalizeCheckout from 'services/checkout/finalize';
import { getUserHighlights } from 'services/users/highlights';
import { getPayment, getUserPayments } from 'services/payments/getPayment';

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
  //console.log(query, 'query in payment');
  //console.log(session, 'session in props');
  //const user = await getUser(session.user.email);
  //console.log(user, 'user in props');
  const userPayments = await getUserPayments(session.user.email);
  //const payment = await getPayment(5);
  //const { payment } = await finalizeCheckout(query.paymentId, session.user.id);

  // if (!isAuthorized(payment, session) || !payment) {
  //   return {
  //     notFound: true
  //   };
  // }

  return {
    props: {
      userPayments
    }
  };
};

export default function PaymentStatus({ userPayments }) {
  return (
    <Layout>
      <section className="section">
        {userPayments.map((item) => (
          <>
            <p>{item.userEmail}</p>
            <p>{item.highlightName}</p>
            <p>{item.createdDate}</p>
          </>
        ))}
        {/* <h1>Payment status: {payment.stripeCheckoutStatus}</h1>
        <p>You bought {payment.highlightName}</p> */}
      </section>
    </Layout>
  );
}
