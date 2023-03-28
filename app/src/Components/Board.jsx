import React from 'react';
import styled from 'styled-components';

function Board() {
  return (
    <Container>
      <p>todo</p>
      <p>doing</p>
    </Container>
  );
}

export default Board;

const Container = styled.main`
  padding: 24px;
  display: flex;
  width: 100%;
  gap: 20px;
  p{
    background: #6880c2;
    width: 240px;
  }
`;
