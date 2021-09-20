import { useContext } from 'react';
import Link from 'next/link';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';

const BagModal = ({ open, setOpen }) => {
  const [{ bagItems }, dispatch] = useContext(GlobalContext);

  //count totalPrice of bag items
  let totalPrice = [];
  bagItems.map((item) => totalPrice.push(item.price * item.qty));

  const showBagItems = bagItems.map((item, index) => {
    return (
      <div className="bagModal__item" key={index}>
        <img
          className="bagModal__image"
          src={
            item.imageUrl
              ? item.imageUrl
              : 'https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg'
          }
          alt=""
        />
        <div className="bagModal__details">
          <h5>{item.name}</h5>
          <div className="bagModal__details-info">
            <div className="bagModal__details-qty">
              <button
                className="plus"
                onClick={() => dispatch({ type: actionTypes.PLUS_ITEM_TO_BAG, payload: item.id })}>
                +
              </button>
              <span>{item.qty}</span>
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
            </div>
            <div className="bagModal__details-price">€ {item.price}</div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {open && (
        <div className="bagModal">
          <div className="bagModal__top">
            <h3>
              My Bag <span>(€{totalPrice.length > 0 && totalPrice.reduce((a, b) => a + b)})</span>
            </h3>
            <button className="bagModal__close" onClick={() => setOpen(false)}>
              <span>Close</span>
              <svg
                className="bagModal__close-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {showBagItems}
          <Link href="/orders">
            <button className="button-link">Go to order</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default BagModal;
