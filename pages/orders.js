import { useState, useContext } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import { getCustomerOrders } from 'services/orders/getOrder';
import { useRouter } from 'next/router';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import Layout from 'components/Layout';
import OrderCustomer from 'components/OrderTable/customer';
import OrderShop from 'components/OrderTable/shop';

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

const Orders = ({ orders }) => {
  const [{ bagItems }, dispatch] = useContext(GlobalContext);
  const [currentTab, setCurrentTab] = useState('cart');
  const router = useRouter();
  //count totalPrice of bag items
  let totalPrice = [];
  bagItems.map((item) => totalPrice.push(item.price * item.qty));

  const handleOrder = () => {
    const orderId = Math.floor(Math.random() * 10000000) + Date.now();
    bagItems.map(async (item) => {
      const payload = {
        product: item,
        message: item.message,
        orderId
      };
      const response = await fetch(`/api/orders`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        dispatch({
          type: actionTypes.RESET_BAG_ITEMS
        });
        dispatch({
          type: 'SET_ACTION_INFO',
          payload: { active: true, text: `Your order is send to bakery` }
        });
        router.push('/orders');
      } else {
        alert('Wrong');
      }
    });
  };

  return (
    <Layout>
      <section className="section">
        <div className="form__triangle"></div>
        <h2>Orders</h2>
      </section>
      <section className="section">
        <div className="table__tabs">
          <button
            className={currentTab === 'cart' && 'active'}
            onClick={() => setCurrentTab('cart')}>
            Cart
          </button>
          <button
            className={currentTab === 'ordered' && 'active'}
            onClick={() => setCurrentTab('ordered')}>
            Ordered
          </button>
        </div>
      </section>
      <section className="section">
        {/* Table for all items in cart */}
        {currentTab === 'cart' && (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price/pcs</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              {bagItems.length > 0 ? (
                <tbody>
                  {bagItems.map((item, i) => (
                    <OrderShop key={item.id} item={item} idx={i + 1} />
                  ))}
                  <tr>
                    <td colSpan="3" className="table__emptyCell"></td>
                    <td>Total</td>
                    <td>
                      <strong>€{totalPrice.reduce((a, b) => a + b).toFixed(2)}</strong>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tr>
                  <td colSpan="5">Your bag is empty !</td>
                </tr>
              )}
            </table>
            {bagItems.length > 0 ? (
              <button className="button" onClick={handleOrder}>
                Order
              </button>
            ) : (
              <Link href="/">
                <button className="button">Products</button>
              </Link>
            )}
          </>
        )}
        {/* Table for all done orders */}
        {currentTab === 'ordered' && (
          <table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>Product</th>
                <th>Order</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* in if search everywhere [0] cause all property in orders are ref from products and airtable save it as array */}
            <tbody>
              {orders?.map((item) => (
                <OrderCustomer key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        )}
      </section>
    </Layout>
  );
};

export default Orders;
