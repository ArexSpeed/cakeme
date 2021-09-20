// import { useContext } from 'react';
// import { GlobalContext } from 'context/ContextProvider';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

const ShopOrders = ({ item }) => {
  return (
    <tr>
      <td className="td__product-id">{item.id}</td>
      <td>
        <div className="td__product">
          <img className="td__product-image" src={item.imageUrl ? item.imageUrl : ''} alt="" />
          <div className="td__product-info">
            <div className="td__product-name">{item.name}</div>
            <div className={`td__product-category ${item.category}`}>{item.category}</div>
          </div>
        </div>
      </td>
      <td>{item.userName}</td>
      <td className="td__product-price">
        {item.qty} x €{item.price},00
      </td>
      <td className="td__product-price-total">€{item.totalPrice},00</td>
      <td className="td__product-date">{item.orderDate.substr(0, 10)}</td>
      <td className="td__product-status">
        <span className="init">{item.status}</span>
      </td>
    </tr>
  );
};

export default ShopOrders;
