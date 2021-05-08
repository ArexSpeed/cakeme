import { useContext } from 'react';
import Link from 'next/link';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import CancelIcon from '@material-ui/icons/Cancel';

const BagModal = ({ open, setOpen }) => {
  const [{ bagItems }, dispatch] = useContext(GlobalContext);
  console.log(bagItems, 'bagItems');

  //count totalPrice of bag items
  let totalPrice = [];
  bagItems.map((item) => totalPrice.push(item.price * item.qty));

  const showBagItems = bagItems.map((item, index) => {
    return (
      <div className="bagModal__item" key={index}>
        <img
          src={
            item.imageUrl
              ? item.imageUrl
              : 'https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg'
          }
          alt=""
        />
        <div className="bagModal__details">
          <h5>{item.name}</h5>
          <div className="bagModal__details-qty">
            <h6>${item.price}</h6>
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
          </div>
        </div>
        <button
          className="delete"
          onClick={() => dispatch({ type: actionTypes.DELETE_BAG_ITEM, payload: item.id })}>
          X
        </button>
      </div>
    );
  });

  return (
    <>
      {open && (
        <div className="bagModal">
          <div className="bagModal__top">
            <h3>My Bag</h3>
            <button className="bagModal__close" onClick={() => setOpen(false)}>
              <CancelIcon />
            </button>
          </div>
          <div className="bagModal__total">
            Total: <h6>${totalPrice.reduce((a, b) => a + b)}</h6>
          </div>
          {showBagItems}
          <Link href="/cart">
            <button className="button-link">Go to cart</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default BagModal;
