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

  const starQty = () => {
    let stars = [];
    for (let i = 0; i < product.score; i++) {
      stars.push(i);
    }
    return stars.map((star) => (
      <svg
        key={star}
        className="product__rank-star"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
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
                <span className="product__rank-score">{product.score.toFixed(2)}</span>
                {starQty()}
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
