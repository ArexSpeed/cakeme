import MyProductItem from 'components/MyProductItem';
import Layout from 'components/Layout';
import { getSession } from 'next-auth/client';
import { getMyProducts } from 'services/offers/getProduct';

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

  const offers = await getMyProducts(session.user.email);

  return {
    props: {
      offers: offers
    }
  };
};

const MyProduct = ({ offers }) => {
  return (
    <Layout>
      <section className="section">
        <h2>My offers</h2>
      </section>
      <section className="section">
        <table className="myProductTable">
          <tr>
            <th>id</th>
            <th>Img</th>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {offers.map((item) => (
            <MyProductItem key={item.id} item={item} />
          ))}
        </table>
      </section>
    </Layout>
  );
};

export default MyProduct;
