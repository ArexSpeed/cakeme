import { useEffect, useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import CardItem from 'components/CardItem';
import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Search from 'components/Search';
import { getSession } from 'next-auth/client';
import { getMyFavoriteProducts } from 'services/products/getProduct';

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/user/login',
        permanent: false
      }
    };
  }

  const products = await getMyFavoriteProducts(session.user.email);

  return {
    props: {
      products: products
    }
  };
};

const FavoriteProducts = ({ products }) => {
  // eslint-disable-next-line prettier/prettier
  const [{ searchProduct, priceProduct, searchProductCategory }, dispatch] = useContext(GlobalContext);

  //reset search values
  useEffect(() => {
    dispatch({
      type: actionTypes.RESET_SEARCH
    });
  }, []);

  return (
    <Layout>
      <Hero>
        <p className="hero__title">Find between all your favorite products</p>
        <Search />
      </Hero>
      <section className="section">
        <h2>My favorite products</h2>
      </section>
      <section className="section">
        {products.map((item) => {
          if (
            (item.name.includes(searchProduct) ||
              item.ingredients.includes(searchProduct) ||
              item.bakery[0].includes(searchProduct) ||
              item?.location?.includes(searchProduct)) &&
            item.category.includes(searchProductCategory) &&
            item.price >= priceProduct[0] &&
            item.price <= priceProduct[1]
          ) {
            return <CardItem key={item.id} product={item} />;
          }
        })}
      </section>
    </Layout>
  );
};

export default FavoriteProducts;
