import { useEffect, useState } from 'react';
import CardItem from 'components/CardItem';
import { AddShoppingCart, ChatBubble, Favorite } from '@material-ui/icons';
import { useSession } from 'next-auth/client';
//style ProductSite

const ProductSite = ({ product, bakeryProducts }) => {
  const [session, loading] = useSession();
  const [like, setLike] = useState(false);
  const [liked, setLiked] = useState([]); //all favorite product id for user
  const ingriedients = product.ingredients.split(',');

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
    console.log(comparision, 'compar');
    if (comparision?.length > 0) {
      setLike(true);
    }
  }, [liked]);

  const toggleFavorite = async () => {
    console.log('toggle');
    const payload = {
      product: product,
      user: session.user
    };

    if (like) {
      const response = await fetch(`/api/products/favorite`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response, 'response in delete');
      if (response.ok) {
        setLike(false);
      }
    } else {
      const response = await fetch(`/api/products/favorite`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response, 'response in  put');
      if (response.ok) {
        setLike(true);
      }
    }
    //window.location.reload(true);
  };

  return (
    <section className="product">
      <div className="product__price">From {product.price}</div>
      <article className="product__top">
        <img
          src={
            product.imageUrl
              ? product.imageUrl
              : 'https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg'
          }
          alt=""
        />
        <div className="product__info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Ingridiens:</p>
          <ul>
            {ingriedients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </article>
      <article>
        <div className="productActions">
          {session && !loading && (
            <button onClick={toggleFavorite}>
              <Favorite
                style={{
                  color: like ? 'orange' : ''
                }}
              />
              <span>Like it</span>
            </button>
          )}
          <button>
            <ChatBubble />
            <span>Send message</span>
          </button>
          <button>
            <AddShoppingCart />
            <span>Order this cake</span>
          </button>
        </div>
        <p>Other products from {product.bakery[0]}</p>
        <section className="section">
          {bakeryProducts.map((item) => (
            <CardItem key={item.id} product={item} />
          ))}
        </section>
      </article>
    </section>
  );
};

export default ProductSite;
