import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../CartContext';

const CartIconContainer = styled.div`
  position: relative;
  margin-right: 10px;

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

  .item-count {
    font-size: ${(props) => (props.itemCount < 99 ? '0.8rem' : '0.6rem')};
  }
`;

const ShoppingCartIcon = () => {
  const { cartItems } = useContext(CartContext);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const numberOfItems = cartItems.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);

    setItemCount(numberOfItems);
  }, [cartItems]);

  return (
    <CartIconContainer>
      <FiShoppingCart size="2rem" className="back-icon" />
      <ItemsCounter className="counter" itemCount={itemCount}>
        <strong className="item-count">{itemCount}</strong>
      </ItemsCounter>
    </CartIconContainer>
  );
};

export default ShoppingCartIcon;
