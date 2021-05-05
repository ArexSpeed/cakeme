import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import styled from 'styled-components';
import { Home, Favorite, AddBox, LocalMall, PowerSettingsNew } from '@material-ui/icons';
import BagModal from 'components/BagModal';
//style - Nav

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Navigation = ({ sidebar, setSidebar, openBag, setOpenBag }) => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <>
      <nav className="nav">
        <button className="navburger" onClick={() => setSidebar(!sidebar)}>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
        </button>
        <div className="nav__logo">CakeMe</div>
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
            </li>
            <li onClick={signOut} aria-hidden="true">
              <PowerSettingsNew />
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
            <li className={router.pathname === '/messages' ? 'active' : ''}>
              <Link href="/messages">Messages</Link>
            </li>
            <li className={router.pathname === '/orders' ? 'active' : ''}>
              <Link href="/orders">Orders</Link>
            </li>
            <li className={router.pathname === '/orders/my' ? 'active' : ''}>
              <Link href="/orders/my">My shop</Link>
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

export default function Layout({ children }) {
  const [sidebar, setSidebar] = useState(false);
  const [openBag, setOpenBag] = useState(false);
  return (
    <Container onClick={() => sidebar && setSidebar(false)}>
      <Navigation
        sidebar={sidebar}
        setSidebar={setSidebar}
        openBag={openBag}
        setOpenBag={setOpenBag}
      />
      <BagModal open={openBag} />
      {children}
    </Container>
  );
}
