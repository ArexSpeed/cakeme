import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Favorite } from '@material-ui/icons';
import { useSession } from 'next-auth/client';
import AddToCartButton from 'components/AddToCartButton';
//style Card

const CardItem = ({ product }) => {
  const [session, loading] = useSession();
  const [like, setLike] = useState(false);
  const [liked, setLiked] = useState([]); //all favorite product id for user

  useEffect(async () => {
    await fetch(`/api/users/favorite`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => setLiked(data));
  }, []);

  useEffect(() => {
    const comparision = liked[0]?.filter((item) => +item === product.id);
    if (comparision?.length > 0) {
      setLike(true);
    }
  }, [liked]);

  const toggleFavorite = async () => {
    const payload = {
      product: product,
      user: session.user
    };
    if (like) {
      await fetch(`/api/products/favorite`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setLike(false);
    } else {
      await fetch(`/api/products/favorite`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setLike(true);
    }
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: `${product.highlight === 'true' ? '#DDB086' : ''}` }}>
      <Link href={`/product/${product.id}`}>
        <div className="card__wrapper">
          <img src={product.imageUrl ? product.imageUrl : ''} alt="" />
          <h3>{product.name}</h3>
          <div className="card__info">
            <h4>From {product.price}$</h4>
            <h4>{product.bakery[0]}</h4>
          </div>
        </div>
      </Link>
      {session && !loading && (
        <div className="card__actions">
          <button onClick={toggleFavorite} className={like ? 'favorite' : ''}>
            <Favorite />
          </button>
          <AddToCartButton item={product} />
        </div>
      )}
    </div>
  );
};

export default CardItem;
