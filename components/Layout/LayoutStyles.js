import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background: transparent;
  color: #000000;
`;

export const NavLogo = styled.a`
  color: #000000;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`;

export const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 30px;
  margin: 10px;
  cursor: pointer;
  z-index: 200;
  & .bar {
    background: #fff;
    height: 4px;
    border-radius: 0.8rem;
    transition: 0.5s ease-in-out;
    &:nth-child(1) {
      background: ${({ theme }) => theme.primary};
      width: 50%;
      &.open {
        transform: rotate(-495deg) translate(-5px, -5px);
        transition: 0.5s ease-in-out;
      }
    }
    &:nth-child(2) {
      background: ${({ theme }) => theme.white};
      width: 100%;
      &.open {
        transform: rotate(-45deg);
        transition: 0.5s ease-in-out;
      }
    }
    &:nth-child(3) {
      background: ${({ theme }) => theme.primary};
      width: 50%;
      align-self: flex-end;
      &.open {
        transform: rotate(-495deg) translate(5px, 5px);
        transition: 0.5s ease-in-out;
      }
    }
  }
`;

export const NavMenu = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NavLink = styled.div`
  font-size: 20px;
  margin: auto 10px;
  position: relative;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &::before {
    position: absolute;
    content: '';
    bottom: -6px;
    left: 0;
    width: 0;
    height: 3px;
    border-radius: 2px;
    background: ${({ theme }) => theme.primary};
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    color: ${({ theme }) => theme.primary};
    transition: all 0.3s ease-in-out;
    &::before {
      width: 100%;
      height: 3px;
    }
  }
`;

export const NavIcons = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Sidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  border-radius: 0 100% 100% 0;
  background: ${({ theme }) => theme.bgPrimary};
  transform: translateX(-100%);
  transition: 0.5s ease-in-out;
  z-index: 100;
  &.open {
    border-radius: 0;
    transform: translateX(0);
    transition: 0.5s ease-in-out;
  }
`;

export const SidebarList = styled.ul`
  margin: 50px auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const SidebarLink = styled(NavLink)`
  margin: 10px 0;
`;

export const Main = styled.div`
  width: 100vw;
  min-height: 100vh;
`;
