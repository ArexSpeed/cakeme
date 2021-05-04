import { useEffect, useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import CardItem from 'components/CardItem';
import Layout from 'components/Layout';
import Search from 'components/Search';
import useSWR from 'swr';
import { getProducts } from 'services/products/getProduct';
import { jsonFetcher } from 'utils';

export const getStaticProps = async () => {
  const products = await getProducts();

  return {
    props: {
      products
    }
  };
};

export default function Home({ products }) {
  const { data } = useSWR('/api/products', jsonFetcher, { initialData: products });
  const [{ searchProduct, priceProduct, searchProductCategory }, dispatch] = useContext(
    GlobalContext
  );

  //reset search values
  useEffect(() => {
    dispatch({
      type: actionTypes.RESET_SEARCH
    });
  }, []);

  return (
    <Layout>
      <>
        <Search />
        <p className="section">All Products: </p>
        <section className="section">
          {data.map((item) => {
            if (
              (item.name.includes(searchProduct) ||
                item.ingredients.includes(searchProduct) ||
                item.bakery[0].includes(searchProduct) ||
                item?.location?.includes(searchProduct)) &&
              item.category.includes(searchProductCategory) &&
              item.price >= priceProduct[0] &&
              item.price <= priceProduct[1]
            ) {
              return <CardItem key={item.id} item={item} />;
            }
          })}
        </section>
      </>
    </Layout>
  );
}
