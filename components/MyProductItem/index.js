import { useRouter } from 'next/router';
import Link from 'next/link';

const MyProductItem = ({ item }) => {
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm(`Do you want to delete product ${item.name}`)) {
      const response = await fetch(`/api/offers/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        router.push(`/product/my`);
      } else {
        const payload = await response.json();
        alert(payload.error?.details[0]?.message);
      }
    } else {
      return;
    }
  };

  return (
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
      <td>{item.price}</td>
      <td>{item.createdAt.substr(0, 10)}</td>
      <td>
        <Link href={`/product/${item.id}/edit`}>
          <button className="edit">Edit</button>
        </Link>
        <Link href={`/product/${item.id}/owner`}>
          <button className="show">Show</button>
        </Link>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MyProductItem;
