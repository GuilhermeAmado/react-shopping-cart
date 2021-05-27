import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../CartContext';
import CartButton from '../components/CartButton';
import CartItem from '../components/CartItem';
import CartItemsList from '../components/CartItemsList';
import EmptyCartWarning from '../components/EmptyCartWarning';

const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="container">
      <PageTitle>Finalizar pedido</PageTitle>
      <CartItemsList>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        {cartItems.length === 0 && <EmptyCartWarning />}
        <CheckoutButtonContainer>
          {cartItems.length > 0 && <CartButton>Finalizar compra</CartButton>}
        </CheckoutButtonContainer>
      </CartItemsList>
    </div>
  );
};

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`;

const CheckoutButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default CartPage;
