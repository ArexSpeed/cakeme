import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px auto;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-width: 70%;
  height: 50px;
  padding: 5px;
  margin-right: 5px;
  background: ${({ theme }) => theme.bgPrimary};
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  & input[type='text'] {
    color: #333;
    background: transparent;
    width: 100%;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    padding: 5px;
    border: none;
    outline: none;
  }
`;

export const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  @media screen and (max-width: 768px) {
    width: 70%;
    justify-content: center;
    margin-top: 40px;
  }
`;

export const CategoryBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgPrimary};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  transition: 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.bgSecondary};
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
    transition: 0.3s ease-in-out;
  }
  & img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    margin: 2px;
  }
  & h5 {
    color: #333;
  }
`;
