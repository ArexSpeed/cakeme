import Link from 'next/link';
import { Favorite, AddShoppingCart, Visibility } from '@material-ui/icons';
import { useSession } from 'next-auth/client';
//style Card

const CardItem = ({ item }) => {
  const [session] = useSession();

  const handleAddToFavorite = async () => {
    const payload = {
      product: item,
      user: session.user
    };
    await fetch(`/api/products/favorite`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
        <button onClick={handleAddToFavorite}>
          <Favorite />
        </button>
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
