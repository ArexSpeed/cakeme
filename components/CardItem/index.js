import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Favorite, AddShoppingCart, Visibility } from '@material-ui/icons';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import { jsonFetcher } from 'utils';
//style Card

const CardItem = ({ item }) => {
  const [favor, setFavor] = useState([])
  const { data } = useSWR(`/api/favorites/get`, jsonFetcher, { initialData: favor });
  const [session, loading] = useSession();
  const [like, setLike] = useState(false);

  useEffect(async () => {
    const response = await fetch(`/api/favorites/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    //console.log(favs, 'favs');
    console.log(data, 'data in useefeckt')
  }, []);

  const addFav = async () => {
    const payload = {
      product: item,
      user: session.user
    };
    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      setLike(true);
    }
  };

  const toggleFavorite = async () => {
    console.log('toggle');
    const payload = {
      product: item,
      user: session.user
    };
    if (item.favoriteEmail?.includes(session.user.email)) {
      await fetch(`/api/favorites`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      await fetch(`/api/favorites`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    window.location.reload(true);
  };

  return (
    <div className="card">
      <img
        src={
          item.imageUrl
            ? item.imageUrl
            : 'https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg'
        }
        alt=""
      />
      <h3>{item.name}</h3>
      <div className="card__info">
        <h4>From {item.price}$</h4>
        <h4>
          <Link href="/">{item.bakery[0]}</Link>
        </h4>
      </div>
      <div className="card__actions">
        {session && !loading && (
          <button
            onClick={addFav}
            className={item.favoriteEmail?.includes(session.user.email) ? 'favorite' : ''}>
            <Favorite />
          </button>
        )}
        <button>
          <Link href={`/product/${item.id}`}>
            <Visibility />
          </Link>
        </button>
        <button>
          <AddShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default CardItem;
