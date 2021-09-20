import React from 'react';

const OrderCustomer = ({ item }) => {
  return (
    <>
      <tr>
        <td className="td__product-id">{item.id}</td>
        <td>
          <div className="td__product">
            <img className="td__product-image" src={item.imageUrl} alt="" />
            <div className="td__product-info">
              <div className="td__product-name">{item.name}</div>
              <div className="td__product-bakery">{item.bakery}</div>
            </div>
          </div>
        </td>
        <td className="td__product-price">
          {item.qty} x €{item.price}.00{' '}
        </td>
        <td className="td__product-price-total">€{item.totalPrice}.00</td>
        <td className="td__product-date">{item.orderDate.substr(0, 10)}</td>
        <td className="td__product-status">
          <span className="init">{item.status}</span>
        </td>
      </tr>
    </>
  );
};

export default OrderCustomer;
