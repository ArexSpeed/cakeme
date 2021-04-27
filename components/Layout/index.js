import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import styled from 'styled-components';
import { Home, Favorite, AddBox, LocalMall, PowerSettingsNew } from '@material-ui/icons';
//style - Nav

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Navigation = ({ sidebar, setSidebar }) => {
  const [session] = useSession();
  //console.log(session, 'session');
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
            <li>
              <Link href="/">
                <Home />
              </Link>
            </li>
            <li>
              <Link href="/favorite">
                <Favorite />
              </Link>
            </li>
            <li>
              <Link href="/add">
                <AddBox />
              </Link>
            </li>
            <li>
              <Link href="/basket">
                <LocalMall />
              </Link>
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
            <li>
              <Link href="/products">My Products</Link>
            </li>
            <li>
              <Link href="/messages">Messages</Link>
            </li>
            <li>
              <Link href="/orders">Orders</Link>
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
  return (
    <Container onClick={() => sidebar && setSidebar(false)}>
      <Navigation sidebar={sidebar} setSidebar={setSidebar} />
      {children}
    </Container>
  );
}
