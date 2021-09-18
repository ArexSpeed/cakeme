import { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import styled from 'styled-components';
import { Home, Favorite, AddBox, LocalMall } from '@material-ui/icons';
import { GlobalContext } from 'context/ContextProvider';
import BagModal from 'components/BagModal';
//import logo from './assets/bg.jpg';
//style - Nav

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 70px;
`;

const Navigation = ({ sidebar, setSidebar, openBag, setOpenBag }) => {
  const [session] = useSession();
  const router = useRouter();
  const [{ bagItems }] = useContext(GlobalContext);
  //count of item in bag
  let bagQty = [];
  bagItems.map((item) => bagQty.push(item.qty));

  return (
    <>
      <nav className="nav">
        <button className="navburger" onClick={() => setSidebar(!sidebar)}>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
        </button>
        <Link href="/">
          <div className="nav__logo">CakeMe</div>
        </Link>
        {session ? (
          <ul>
            <li className={router.pathname === '/' ? 'active' : ''}>
              <Link href="/">
                <Home />
              </Link>
            </li>
            <li className={router.pathname === '/product/favorite' ? 'active' : ''}>
              <Link href="/product/favorite">
                <Favorite />
              </Link>
            </li>
            <li className={router.pathname === '/product/create' ? 'active' : ''}>
              <Link href="/product/create">
                <AddBox />
              </Link>
            </li>
            <li
              className={openBag ? 'active' : ''}
              onClick={() => setOpenBag(!openBag)}
              aria-hidden="true">
              <LocalMall />
              <div className="bag-circle">
                {bagItems.length > 0 && bagQty.reduce((a, b) => a + b)}
              </div>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link href="/user/login">Login</Link>
            </li>
            <li>
              <Link href="/user/register">Register</Link>
            </li>
          </ul>
        )}
      </nav>
      <div className={sidebar ? 'sidebar open' : 'sidebar'}>
        {session ? (
          <ul>
            <li className={router.pathname === '/product/my' ? 'active' : ''}>
              <Link href="/product/my">My Products</Link>
            </li>
            <li className={router.pathname === '/orders' ? 'active' : ''}>
              <Link href="/orders">Orders</Link>
            </li>
            <li className={router.pathname === '/orders/shop' ? 'active' : ''}>
              <Link href="/orders/shop">My shop</Link>
            </li>
            <li className={router.pathname === '/premium' ? 'active' : ''}>
              <Link href="/premium">Premium</Link>
            </li>
            <li className={router.pathname === '/settings' ? 'active' : ''}>
              <Link href="/settings">Settings</Link>
            </li>
            <li onClick={signOut} aria-hidden="true">
              Logout
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link href="/user/login">Login</Link>
            </li>
            <li>
              <Link href="/user/register">Register</Link>
            </li>
            <li>Login or create account to see more!</li>
          </ul>
        )}
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <footer>
      <div>&copy; Cake me </div>
    </footer>
  );
};

export default function Layout({ children }) {
  const [sidebar, setSidebar] = useState(false);
  const [openBag, setOpenBag] = useState(false);
  return (
    <Container onClick={() => sidebar && setSidebar(false)}>
      <Wrapper>
        <Navigation
          sidebar={sidebar}
          setSidebar={setSidebar}
          openBag={openBag}
          setOpenBag={setOpenBag}
        />
        <BagModal open={openBag} setOpen={setOpenBag} />
        {children}
      </Wrapper>
      <Footer />
    </Container>
  );
}
