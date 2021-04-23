import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px auto;
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
`;
