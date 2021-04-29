import React from 'react';
import Link from 'next/link';

const MyProductItem = ({ item }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>
        <img
          src="https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg"
          alt=""
        />
      </td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.createdAt.substr(0, 10)}</td>
      <td>
        <Link href={`/product/${item.id}/edit`}>
          <button className="edit">Edit</button>
        </Link>
        <Link href={`/product/${item.id}/owner`}>
          <button className="show">Show</button>
        </Link>
        <button className="delete">Delete</button>
      </td>
    </tr>
  );
};

export default MyProductItem;
