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
    <div className={`${product.highlight === 'true' ? 'card highlight' : 'card'}`}>
      <Link href={`/product/${product.id}`}>
        <div className="card__wrapper">
          <img src={product.imageUrl ? product.imageUrl : ''} alt="" />
          <p className="card__product-name">{product.name}</p>
          <p className="card__product-bakery">{product.bakery[0]}</p>
          <p className="card__product-price">€{product.price},00</p>
          <div className="card__rank">
            <span className="card__rank-score">5,0</span>
            <svg
              className="card__rank-star"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
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
