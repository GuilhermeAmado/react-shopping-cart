import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { CartContext } from '../CartContext';
import { useHistory } from 'react-router-dom';

const CartItem = ({ item: currentItem }) => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const history = useHistory();

  function handleItemCartCountUpdate(mode) {
    let plusOrMinusOne;
    if (mode === 'add') plusOrMinusOne = '+1';
    if (mode === 'remove') plusOrMinusOne = '-1';

    const cartProductToUpdateCount = cartItems.find(
      (cartItem) => cartItem.id === currentItem.id
    );

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === cartProductToUpdateCount.id) {
        return {
          ...cartProductToUpdateCount,
          quantity: cartItem.quantity + Number(plusOrMinusOne),
        };
      } else {
        return { ...cartItem };
      }
    });
    setCartItems(updatedCartItems);

    if (updatedCartItems.length === 1 && updatedCartItems[0].quantity === 0) {
      setCartItems([]);
      history.push('/');
    }
  }

  useEffect(() => {
    if (currentItem.quantity === 0) {
      setCartItems((cartItems) =>
        cartItems.filter(({ id }) => id !== currentItem.id)
      );
    }
  }, [currentItem, setCartItems]);

  if (currentItem.quantity === 0) {
    return null;
  }

  return (
    <CartItemCard>
      <ItemQuantityUpdater>
        <FiMinusCircle
          size="1.5em"
          onClick={() => handleItemCartCountUpdate('remove')}
        />
        <span>{currentItem.quantity}</span>
        <FiPlusCircle
          size="1.5em"
          onClick={() => handleItemCartCountUpdate('add')}
        />
      </ItemQuantityUpdater>
      {currentItem.name}
    </CartItemCard>
  );
};

const CartItemCard = styled.li`
  width: 100%;
  padding: 15px;
  border: var(--primary-border);
  border-radius: 4px;

  display: flex;
  align-items: center;
`;

const ItemQuantityUpdater = styled.div`
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
    :hover {
      color: var(--accent-color);
    }
  }

  span {
    font-weight: 700;
    margin: 0 0.75rem;
  }
`;

export default CartItem;
