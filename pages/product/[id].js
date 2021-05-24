import Layout from 'components/Layout';
//import ProductSite from 'components/ProductSite';
import { getProduct, getProducts, getBakeryProducts } from 'services/products/getProduct';
import { useEffect, useState } from 'react';
import CardItem from 'components/CardItem';
import { Favorite } from '@material-ui/icons';
import { useSession } from 'next-auth/client';
import AddToCartButton from 'components/AddToCartButton';

export const getStaticPaths = async () => {
  const products = await getProducts();

  return {
    paths: products.map((product) => ({
      params: { id: String(product.id) }
    })),
    fallback: true
  };
};

export const getStaticProps = async ({ params }) => {
  const product = await getProduct(params.id);
  const bakeryProducts = await getBakeryProducts(product.bakery[0]);

  return {
    revalidate: 30,
    props: {
      product,
      bakeryProducts,
      metaTitle: product.name,
      metaDescription: product.description
    }
  };
};

export default function ProductPage({ product, bakeryProducts }) {
  const [session, loading] = useSession();
  const [like, setLike] = useState(false);
  const [liked, setLiked] = useState([]); //all favorite product id for user
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    if (product) {
      setIngredients(product.ingredients?.split(','));
    }
  }, [product]);

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
      const response = await fetch(`/api/products/favorite`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });

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

      if (response.ok) {
        setLike(true);
      }
    }
    //window.location.reload(true);
  };

  return (
    <Layout>
      <main className="main">
        <section className="product">
          <div className="product__price">From {product?.price}</div>
          <article className="product__top">
            <img
              src={
                product?.imageUrl
                  ? product?.imageUrl
                  : 'https://www.przyslijprzepis.pl/media/cache/big/uploads/media/recipe/0007/27/domowy-drip-cake_1.jpeg'
              }
              alt=""
            />
            <div className="product__info">
              <h2>{product?.name}</h2>
              <p>{product?.description}</p>
              <p>Ingredients:</p>
              <ul>
                {ingredients?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
          <article>
            {session && !loading && (
              <div className="productActions">
                <button onClick={toggleFavorite}>
                  <Favorite
                    style={{
                      color: like ? 'orange' : ''
                    }}
                  />
                  <span>Like it</span>
                </button>
                <AddToCartButton item={product} />
              </div>
            )}
            {!session && (
              <div className="productActions">
                <h4>You have to login to order this product</h4>
              </div>
            )}

            <p>Other products from {product?.bakery[0]}</p>
            <section className="section">
              {bakeryProducts?.map((item) => (
                <CardItem key={item.id} product={item} />
              ))}
            </section>
          </article>
        </section>
      </main>
    </Layout>
  );
}
