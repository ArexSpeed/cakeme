import React from 'react';

const OrderShop = ({ item }) => {
  return (
    <>
      <tr>
        <td>{item.id}</td>
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
        <td>{item.userName}</td>
        <td>{item.qty}</td>
        <td>{item.price}</td>
        <td>{item.totalPrice}</td>
        <td>{item.orderDate.substr(0, 10)}</td>
        <td>{item.status}</td>
      </tr>
      <tr>
        <td colSpan="9">Message: {item.message}</td>
      </tr>
    </>
  );
};

export default OrderShop;
