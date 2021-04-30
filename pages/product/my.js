import MyProductItem from 'components/MyProductItem';
import Layout from 'components/Layout';
import { getSession } from 'next-auth/client';
import { getMyProducts } from 'services/products/getProduct';

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

  const products = await getMyProducts(session.user.email);

  return {
    props: {
      products: products
    }
  };
};

const MyProduct = ({ products }) => {
  return (
    <Layout>
      <section className="section">
        <h2>My products</h2>
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
          {products.map((item) => (
            <MyProductItem key={item.id} item={item} />
          ))}
        </table>
      </section>
    </Layout>
  );
};

export default MyProduct;
