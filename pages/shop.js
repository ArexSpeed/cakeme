import { useState } from 'react';
import Link from 'next/link';
import Layout from 'components/Layout';
import { getSession } from 'next-auth/client';
import { getMyProducts } from 'services/products/getProduct';
import { getUserHighlights } from 'services/users/highlights';
import { getBakeryOrders } from 'services/orders/getOrder';
import ActionInfo from 'components/ActionInfo';
import ShopProduct from 'components/ShopTables/products';
import ShopOrders from 'components/ShopTables/orders';
import SearchIcon from '@material-ui/icons/Search';

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
  const orders = await getBakeryOrders(session.user.email);

  return {
    props: {
      products,
      userHighlights,
      orders
    }
  };
};

const ShopPage = ({ products, userHighlights, orders }) => {
  const [currentTab, setCurrentTab] = useState('products');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  console.log(orders, 'orders');

  return (
    <Layout>
      <section className="section">
        <div className="form__triangle"></div>
        <h2>My Shop</h2>
      </section>
      <section className="section">
        <ActionInfo />
      </section>
      <section className="section">
        <p>
          You can highlight <strong>{userHighlights}</strong> products
        </p>
      </section>
      <section className="section">
        <Link href="/product/create">
          <button className="button">
            <span>Add new product</span>
          </button>
        </Link>
      </section>
      <section className="section">
        <div className="table__tabs">
          <button
            className={currentTab === 'products' && 'active'}
            onClick={() => setCurrentTab('products')}>
            Products
          </button>
          <button
            className={currentTab === 'orders' && 'active'}
            onClick={() => setCurrentTab('orders')}>
            Orders
          </button>
        </div>
      </section>
      <section className="section">
        {currentTab === 'products' && (
          <>
            <div className="table__search">
              <div className="table__search-box">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Find product, category"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Actions</th>
                  <th>Highlight</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter(
                    (item) =>
                      item.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      item.category.toLowerCase().includes(productSearch.toLowerCase())
                  )
                  .map((item) => (
                    <ShopProduct key={item.id} item={item} highlightQty={userHighlights} />
                  ))}
              </tbody>
            </table>
          </>
        )}
        {currentTab === 'orders' && (
          <>
            <div className="table__search">
              <div className="table__search-box">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Find order"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                />
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              {/* in if search everywhere [0] cause all property in orders are ref from products and airtable save it as array */}
              <tbody>
                {orders
                  .filter(
                    (item) =>
                      item.name[0].toLowerCase().includes(orderSearch.toLowerCase()) ||
                      item.userName[0].toLowerCase().includes(orderSearch.toLowerCase())
                  )
                  .map((item) => (
                    <ShopOrders key={item.id} item={item} />
                  ))}
              </tbody>
            </table>
          </>
        )}
      </section>
    </Layout>
  );
};

export default ShopPage;
