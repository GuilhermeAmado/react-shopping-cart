import React from 'react';
import styled from 'styled-components';

const CartItemsListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style: none;
`;

const CartItemsList = (props) => {
  return <CartItemsListContainer>{props.children}</CartItemsListContainer>;
};

export default CartItemsList;
