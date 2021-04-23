import { useState } from 'react';
import Link from 'next/link';
// eslint-disable-next-line prettier/prettier
import { Nav, NavBar, NavLogo, NavLink, NavIcons, Sidebar, SidebarList, SidebarLink, Main } from './LayoutStyles';
import { Home, Favorite, NotificationsNone, AddBox, PowerSettingsNew } from '@material-ui/icons';
//import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const Navigation = ({ sidebar, setSidebar }) => {
  return (
    <>
      <Nav>
        <NavBar onClick={() => setSidebar(!sidebar)}>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
          <div className={sidebar ? 'bar open' : 'bar'}></div>
        </NavBar>
        <NavLogo>CakeMe</NavLogo>
        <NavIcons>
          <NavLink>
            <Link href="/">
              <Home />
            </Link>
          </NavLink>
          <NavLink>
            <Link href="/favorite">
              <Favorite />
            </Link>
          </NavLink>
          <NavLink>
            <Link href="/add">
              <AddBox />
            </Link>
          </NavLink>
          <NavLink>
            <Link href="/notifications">
              <NotificationsNone />
            </Link>
          </NavLink>
          <NavLink>
            <Link href="/logout">
              <PowerSettingsNew />
            </Link>
          </NavLink>
        </NavIcons>
      </Nav>
      <Sidebar className={sidebar ? 'open' : ''}>
        <SidebarList>
          <SidebarLink>
            <Link href="/products">My Products</Link>
          </SidebarLink>
          <SidebarLink>
            <Link href="/messages">Messages</Link>
          </SidebarLink>
          <SidebarLink>
            <Link href="/orders">Orders</Link>
          </SidebarLink>
        </SidebarList>
      </Sidebar>
    </>
  );
};

export default function Layout({ children }) {
  const [sidebar, setSidebar] = useState(false);
  return (
    <Main onClick={() => sidebar && setSidebar(false)}>
      <Navigation sidebar={sidebar} setSidebar={setSidebar} />
      {children}
    </Main>
  );
}
