import { useState, useContext } from 'react';
import Link from 'next/link';
import { GlobalContext } from 'context/ContextProvider';

const BagModal = ({ open }) => {
  //const [sum, setSum] = useState(0);
  const [{ bagItems }, dispatch] = useContext(GlobalContext);
  console.log(bagItems, 'bagItems');
  // totalItems -> array of price and qty of one item in bag
  let totalItems = [];
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
            <button className="minus" onClick={() => console.log('minus')}>
              -
            </button>
            <h6>1</h6>
            <button className="plus" onClick={() => console.log('plus')}>
              +
            </button>
          </div>
        </div>
        <button className="delete" onClick={() => console.log('delete')}>
          X
        </button>
      </div>
    );
  });
  //totalPrice -> price of one chosen item -> price*qty
  // let totalPrice = []
  // totalItems.map(item => totalPrice.push(item.price*item.qty))

  return (
    <>
      {open && (
        <div className="bagModal">
          <h3>My Bag</h3>
          Total:
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
