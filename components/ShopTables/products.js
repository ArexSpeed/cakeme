import { useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ShopProduct = ({ item, highlightQty }) => {
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
    <tr>
      <td
        className={`${item.highlight === 'true' ? 'td__product-id highlight' : 'td__product-id'}`}>
        {item.id}
      </td>
      <td>
        <div className="td__product">
          <img className="td__product-image" src={item.imageUrl ? item.imageUrl : ''} alt="" />
          <div className="td__product-info">
            <div className="td__product-name">{item.name}</div>
          </div>
        </div>
      </td>
      <td className="td__product-price-total">€{item.price},00</td>
      <td className="td__product-date">{item.createdAt.substr(0, 10)}</td>
      <td>
        <Link href={`/product/${item.id}/edit`}>
          <button className="edit">Edit</button>
        </Link>
        <Link href={`/product/${item.id}`}>
          <button className="show">Show</button>
        </Link>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </td>
      <td className="td__product-date">
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

export default ShopProduct;
