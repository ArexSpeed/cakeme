import styled from 'styled-components';

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: auto;
  padding: 10px;
  width: 100%;
  max-width: 1400px;
  height: auto;
  background: ${({ theme }) => theme.primary};
  border-radius: 24px;
  position: relative;
`;

export const ProductTop = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProductPrice = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  background: ${({ theme }) => theme.bgSecondary};
  border-radius: 8px 0 8px 0;
`;

export const ProductImg = styled.img`
  width: 45%;
  border-radius: 16px;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 10px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px auto;
`;

export const ActionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  width: 150px;
  height: 40px;
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
`;
