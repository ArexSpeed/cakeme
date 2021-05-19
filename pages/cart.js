import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import Layout from 'components/Layout';

const Cart = () => {
  const [{ bagItems }, dispatch] = useContext(GlobalContext);
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
      //console.log(payload, 'payload in effect');
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

  const showItems = bagItems.map((item, i) => (
    <>
      <tr key={item.id}>
        <td>{i + 1}</td>
        <td>
          <img
            src={
              item.imageUrl
                ? item.imageUrl
                : 'https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg'
            }
            alt=""
          />
        </td>
        <td>{item.name}</td>
        <td>{item.bakery}</td>
        <td>{item.price}</td>
        <td className="qty">
          <button
            className="minus"
            onClick={() => dispatch({ type: actionTypes.MINUS_ITEM_TO_BAG, payload: item.id })}>
            -
          </button>
          <h6>{item.qty}</h6>
          <button
            className="plus"
            onClick={() => dispatch({ type: actionTypes.PLUS_ITEM_TO_BAG, payload: item.id })}>
            +
          </button>
        </td>
        <td>{item.price * item.qty}</td>
      </tr>
      <tr>
        <td colSpan="7">
          <textarea
            placeholder="Message to bakery"
            value={item.message}
            onChange={(e) =>
              dispatch({
                type: actionTypes.ADD_MESSAGE_TO_BAG_ITEM,
                payload: { id: item.id, message: e.target.value }
              })
            }
          />
        </td>
      </tr>
    </>
  ));

  return (
    <Layout>
      <p className="section">Products to order: </p>
      <section className="section">
        <table className="table">
          <tr>
            <th>#</th>
            <th>Img</th>
            <th>Name</th>
            <th>Bakery</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
          {bagItems.length > 0 ? (
            <>
              {showItems}
              <tr>
                <td colSpan="5"></td>
                <td>Total</td>
                <td>
                  <strong>{totalPrice.reduce((a, b) => a + b)}</strong>
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="7">Your bag is empty !</td>
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
      </section>
    </Layout>
  );
};

export default Cart;
