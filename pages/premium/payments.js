import Layout from 'components/Layout';
import { getSession } from 'next-auth/client';
// import { getUser } from 'services/users/getUser';
// import isAuthorized from 'services/products/isAuthorized';
// import finalizeCheckout from 'services/checkout/finalize';
// import { getUserHighlights } from 'services/users/highlights';
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
  const lastPayment = await getPayment(userPayments[0].id); //find last payments
  console.log(lastPayment, 'payment');
  //const { payment } = await finalizeCheckout(lastPayment.airtableId, session.user.id);

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
        <h2>All my payments</h2>
        <table className="myProductTable">
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
