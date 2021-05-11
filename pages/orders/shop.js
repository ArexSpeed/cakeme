import { useContext, useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import { getBakeryOrders } from 'services/orders/getOrder';
import Layout from 'components/Layout';
import OrderShop from 'components/OrderTable/shop';
import Search from 'components/Search';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';

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
  console.log(session, 'session params');
  const orders = await getBakeryOrders(session.user.name);

  return {
    props: {
      orders: orders
    }
  };
};

const OrderPage = ({ orders }) => {
  // eslint-disable-next-line prettier/prettier
  const [{ searchProduct, priceProduct, searchProductCategory }, dispatch] = useContext(GlobalContext);
  const [usersOrder, setUsersOrder] = useState([]);
  //reset search values
  useEffect(() => {
    dispatch({
      type: actionTypes.RESET_SEARCH
    });
    setUsersOrder([]);
    orders.filter(
      (order) =>
        usersOrder.filter((user) => user) !== order.userName &&
        setUsersOrder((prev) => [...prev, order.userName])
    );
  }, []);

  return (
    <Layout>
      <Search />
      <section className="section">
        <p className="section">Orders to my bakery: </p>
        <p>Show order from user:</p>
        <select>
          <option value="">All</option>
          {usersOrder.map((user, i) => (
            <option key={i} value={user}>
              {user}
            </option>
          ))}
        </select>
        <table className="myProductTable">
          <tr>
            <th>id</th>
            <th>Img</th>
            <th>Name</th>
            <th>User</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
          {/* in if search everywhere [0] cause all property in orders are ref from products and airtable save it as array */}
          {orders.map((item) => {
            if (
              (item.name[0].includes(searchProduct) || item.userName[0].includes(searchProduct)) &&
              item.category[0].includes(searchProductCategory) &&
              item.price[0] >= priceProduct[0] &&
              item.price[0] <= priceProduct[1]
            ) {
              return <OrderShop key={item.id} item={item} />;
            }
          })}
        </table>
      </section>
    </Layout>
  );
};

export default OrderPage;
