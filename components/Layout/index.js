import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Home, Favorite, AddBox, LocalMall, PowerSettingsNew } from '@material-ui/icons';
//style - Nav

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Navigation = ({ sidebar, setSidebar }) => {
  return (
    <>
      <nav className="nav">
        <button className="navburger" onClick={() => setSidebar(!sidebar)}>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
        </button>
        <div className="nav__logo">CakeMe</div>
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
          <li>
            <Link href="/logout">
              <PowerSettingsNew />
            </Link>
          </li>
        </ul>
      </nav>
      <sidebar className={sidebar ? 'sidebar open' : 'sidebar'}>
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
      </sidebar>
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
