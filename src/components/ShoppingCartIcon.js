import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../CartContext';

const CartIconContainer = styled.div`
  position: relative;

  .counter {
    position: absolute;
    top: -10px;
    left: 20px;
  }
`;

const ItemsCounter = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1;
  color: var(--text-light);
  background-color: var(--accent-color);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShoppingCartIcon = () => {
  const { cartItems } = useContext(CartContext);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (cartItems.length > 0) {
      const numberOfItems = cartItems.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0);

      setItemCount(numberOfItems);
    }
  }, [cartItems]);

  return (
    <CartIconContainer>
      <FiShoppingCart size="2rem" className="back-icon" />
      <ItemsCounter className="counter">
        <strong>{itemCount}</strong>
      </ItemsCounter>
    </CartIconContainer>
  );
};

export default ShoppingCartIcon;
