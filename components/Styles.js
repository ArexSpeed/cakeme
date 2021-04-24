import styled from 'styled-components';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  align-items: ${({ align }) => (align ? align : 'center')};
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  align-items: ${({ align }) => (align ? align : 'center')};
  width: 100%;
  //overflow: ${({ overflow }) => (overflow ? overflow : 'hidden')};
  overflow-x: scroll;
  margin: auto;
`;
