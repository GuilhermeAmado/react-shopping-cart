import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.ul`
  list-style: none;
  margin: 3rem auto;
  padding: 0 10px;
  max-width: 620px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProductsList = (props) => {
  return <ListContainer>{props.children}</ListContainer>;
};

export default ProductsList;
