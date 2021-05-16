import { useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
import { useRouter } from 'next/router';
import Link from 'next/link';

const MyProductItem = ({ item, highlightQty }) => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useContext(GlobalContext);
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm(`Do you want to delete product ${item.name}`)) {
      const response = await fetch(`/api/products/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        dispatch({
          type: 'SET_ACTION_INFO',
          payload: { active: true, text: `Delete ${item.name} correct` }
        });
        router.push(`/product/my`);
      } else {
        const payload = await response.json();
        alert(payload.error?.details[0]?.message);
      }
    } else {
      return;
    }
  };

  const highlightProduct = async () => {
    const payload = {
      item
    };
    await fetch(`/api/products/highlights`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  const handleHighlight = async () => {
    console.log('handleHightlight');
    const payload = {
      item: item,
      restHighlights: highlightQty[0] - 1
    };

    if (highlightQty[0] > 0) {
      if (confirm(`Do you want to highlight product ${item.name}`)) {
        highlightProduct();
        const response = await fetch(`/api/highlights`, {
          method: 'PUT',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          dispatch({
            type: 'SET_ACTION_INFO',
            payload: { active: true, text: `You add highlight to ${item.name}` }
          });
          window.location.reload(true);
        } else {
          dispatch({
            type: 'SET_ACTION_INFO',
            payload: { active: true, text: `Something went wrong!` }
          });
        }
      } else {
        return;
      }
    } else {
      dispatch({
        type: 'SET_ACTION_INFO',
        payload: { active: true, text: `You do not have more highlight!` }
      });
    }
  };

  return (
    <tr style={{ backgroundColor: `${item.highlight === 'true' ? '#DDB086' : ''}` }}>
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
      <td>
        {item.highlight === 'false' ? (
          <button className="highlight" onClick={handleHighlight}>
            Highlight
          </button>
        ) : (
          <span>
            {item.highlightTill.substr(0, 10)} {item.highlightTill.substr(11, 11)}
          </span>
        )}
      </td>
    </tr>
  );
};

export default MyProductItem;
