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
    <tr key={item.id}>
      <td>{i + 1}</td>
      <td>
        <div className="td__product">
          <img
            className="td__product-image"
            src={
              item.imageUrl
                ? item.imageUrl
                : 'https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg'
            }
            alt=""
          />
          <div className="td__product-info">
            <div className="td__product-name">{item.name}</div>
            <div className="td__product-bakery">{item.bakery}</div>
          </div>
        </div>
      </td>
      <td className="td__product-price">€{item.price}.00 </td>
      <td>
        <div className="td__product-qty">
          <button
            className="minus"
            onClick={() => {
              if (item.qty === 1) {
                dispatch({ type: actionTypes.DELETE_BAG_ITEM, payload: item.id });
              } else {
                dispatch({ type: actionTypes.MINUS_ITEM_TO_BAG, payload: item.id });
              }
            }}>
            -
          </button>
          <span>{item.qty}</span>
          <button
            className="plus"
            onClick={() => dispatch({ type: actionTypes.PLUS_ITEM_TO_BAG, payload: item.id })}>
            +
          </button>
        </div>
      </td>
      <td className="td__product-price-total">€{item.price * item.qty}.00</td>
    </tr>
  ));

  return (
    <Layout>
      <section className="section">
        <div className="form__triangle"></div>
        <h2>Orders</h2>
      </section>
      <section className="section">
        <div className="table__tabs">
          <button className="active">Cart</button>
          <button>Ordered</button>
        </div>
      </section>
      <section className="section">
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
              {showItems}
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
      </section>
    </Layout>
  );
};

export default Cart;
