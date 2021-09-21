import { useContext } from 'react';

import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';

const OrderShop = ({ item, idx }) => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useContext(GlobalContext);
  return (
    <tr>
      <td className="td__product-id">{idx}</td>
      <td>
        <div className="td__product">
          <img className="td__product-image" src={item.imageFirstUrl} alt="" />
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
  );
};

export default OrderShop;
