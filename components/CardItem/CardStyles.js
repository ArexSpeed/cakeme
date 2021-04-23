import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 375px;
  margin: 10px;
  border-radius: 24px;
  background: ${({ theme }) => theme.bgPrimary};
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
  transition: 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  &:hover {
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.25);
    transition: 0.3s ease-in-out;
    background: ${({ theme }) => theme.bgSecondary};
  }
`;

export const CardImg = styled.img`
  width: 220px;
  height: 200px;
  margin: 16px auto;
  border-radius: 16px;
`;

export const CardTitle = styled.h3`
  margin: 0 auto;
  font-size: 20px;
  color: ${({ theme }) => theme.blue};
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 5px;
  & h4 {
    font-size: 14px;
    color: ${({ theme }) => theme.blue};
    font-weight: 500;
    max-width: 100px;
    flex-wrap: wrap;
    &:nth-child(1) {
      align-self: flex-start;
    }
    &:nth-child(2) {
      align-self: flex-end;
    }
  }
`;

export const CardActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px;
`;

export const CardButton = styled.button`
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  &:hover {
    color: ${({ theme }) => theme.bgPrimary};
    transition: all 0.3s ease-in-out;
  }
`;
