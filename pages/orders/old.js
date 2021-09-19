import { useContext, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import { getCustomerOrders } from 'services/orders/getOrder';
import Layout from 'components/Layout';
import OrderCustomer from 'components/OrderTable/customer';
import Search from 'components/Search';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import ActionInfo from 'components/ActionInfo';

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

  const orders = await getCustomerOrders(session.user.email);

  return {
    props: {
      orders: orders
    }
  };
};

const OrderPage = ({ orders }) => {
  // eslint-disable-next-line prettier/prettier
  const [{ searchProduct, priceProduct, searchProductCategory }, dispatch] = useContext(GlobalContext);

  //reset search values
  useEffect(() => {
    dispatch({
      type: actionTypes.RESET_SEARCH
    });
  }, []);

  return (
    <Layout>
      <Search />
      <section className="section">
        <ActionInfo />
      </section>
      <section className="section">
        <table className="table">
          <tr>
            <th>id</th>
            <th>Img</th>
            <th>Name</th>
            <th>Bakery</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
          {/* in if search everywhere [0] cause all property in orders are ref from products and airtable save it as array */}
          {orders.map((item) => {
            if (
              (item.name[0].includes(searchProduct) || item.bakery[0].includes(searchProduct)) &&
              item.category[0].includes(searchProductCategory) &&
              item.price[0] >= priceProduct[0] &&
              item.price[0] <= priceProduct[1]
            ) {
              return <OrderCustomer key={item.id} item={item} />;
            }
          })}
        </table>
      </section>
    </Layout>
  );
};

export default OrderPage;
