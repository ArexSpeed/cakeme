import { useEffect, useContext } from 'react';
import { GlobalContext } from 'context/ContextProvider';
import { actionTypes } from 'context/reducer';
import MyProductItem from 'components/MyProductItem';
import Layout from 'components/Layout';
import { getSession } from 'next-auth/client';
import { getMyProducts } from 'services/products/getProduct';
import { getUserHighlights } from 'services/users/getHighlights';
import ActionInfo from 'components/ActionInfo';
import Search from 'components/Search';

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

  const products = await getMyProducts(session.user.email);
  const userHighlights = await getUserHighlights(session.user.email);

  return {
    props: {
      products,
      userHighlights
    }
  };
};

const MyProduct = ({ products, userHighlights }) => {
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
      <Search />
      <section className="section">
        <ActionInfo />
      </section>
      <section className="section">
        <h2>My products</h2>
      </section>
      <section className="section">
        <p>
          You can highlight <strong>{userHighlights}</strong> products
        </p>
      </section>
      <section className="section">
        <table className="myProductTable">
          <tr>
            <th>id</th>
            <th>Img</th>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
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
              return <MyProductItem key={item.id} item={item} />;
            }
          })}
        </table>
      </section>
    </Layout>
  );
};

export default MyProduct;
