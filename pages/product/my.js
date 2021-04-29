import CardItem from 'components/CardItem';
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
      My offers
      {offers.map((item) => (
        <CardItem key={item.id} item={item} />
      ))}
    </Layout>
  );
};

export default MyProduct;
