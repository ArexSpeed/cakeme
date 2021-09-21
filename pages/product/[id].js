import Layout from 'components/Layout';
import { getProduct, getProducts, getBakeryProducts } from 'services/products/getProduct';
import { useEffect, useState } from 'react';
import CardItem from 'components/CardItem';
import { Favorite } from '@material-ui/icons';
import { useSession } from 'next-auth/client';
import AddToCartButton from 'components/AddToCartButton';
import Stars from 'components/Stars';

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
  const [imageIndex, setImageIndex] = useState(0);
  const [showImage, setShowImage] = useState([]);

  useEffect(() => {
    if (product) {
      setIngredients(product.ingredients);
      setShowImage([product?.imageFirstUrl, product?.imageSecondUrl, product?.imageThirdUrl]);
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
          <div className="product__title">
            <div className="product__title-name">{product?.name}</div>
            {session && !loading && (
              <button className="product__title-button" onClick={toggleFavorite}>
                <Favorite
                  style={{
                    color: like ? 'orange' : '',
                    width: '32px',
                    height: '32px'
                  }}
                />
              </button>
            )}
          </div>
          <article className="product__container">
            <div className="product__images">
              <img src={showImage[imageIndex]} alt="" />
              <div className="product__images-small">
                <button onClick={() => setImageIndex(0)}>
                  <img src={product?.imageFirstUrl ? product?.imageFirstUrl : ''} alt="" />
                </button>
                <button onClick={() => setImageIndex(1)}>
                  <img src={product?.imageSecondUrl ? product?.imageSecondUrl : ''} alt="" />
                </button>
                <button onClick={() => setImageIndex(2)}>
                  <img src={product?.imageThirdUrl ? product?.imageThirdUrl : ''} alt="" />
                </button>
              </div>
            </div>
            <div className="product__info">
              <div className="product__price">€{product?.price},00</div>
              <div className="product__rank">
                <span className="product__rank-score">{product?.score.toFixed(2)}</span>
                <Stars qty={product?.score} />
              </div>
              <div className="product__description">{product?.description}</div>
              <div>
                <p className="product__ingredients">Ingredients:</p>
                <p className="product__description">{ingredients}</p>
              </div>
              {session && !loading && (
                <button className="product__add">
                  <AddToCartButton item={product} /> <span>Add to cart</span>
                </button>
              )}
            </div>
          </article>
          <article>
            <div className="section__name">
              <span>Other products from {product?.bakery[0]}</span>
            </div>
            <section className="product__other">
              {bakeryProducts?.map((item) => (
                <CardItem key={item.id} product={item} />
              ))}
            </section>
            <div className="section__name">
              <span>Similar products</span>
            </div>
            <section className="product__other">
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
