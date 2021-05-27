import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { CartContext } from '../CartContext';
import CartButton from '../components/CartButton';
import CartItem from '../components/CartItem';
import CartItemsList from '../components/CartItemsList';
import EmptyCartWarning from '../components/EmptyCartWarning';
import formatCurrency from '../utils/formatCurrency';

const CartPage = () => {
  const { cartItems, setShowModal } = useContext(CartContext);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0);

  function handleCheckout() {
    setShowModal(true);
  }

  useEffect(() => {
    if (cartItems.length > 0) {
      const totalPrice = cartItems.reduce((accumulator, item) => {
        return accumulator + item.price * item.quantity;
      }, 0);
      setTotalPurchasePrice(totalPrice);
    }
  }, [cartItems]);

  return (
    <div className="container">
      <PageTitle>Finalizar pedido</PageTitle>
      <CartItemsList>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        {cartItems.length === 0 && <EmptyCartWarning />}

        {cartItems.length > 0 && (
          <>
            <PurchaseTotalContainer>
              <strong>Total</strong>
              <strong className="total-value">
                {formatCurrency(totalPurchasePrice)}
              </strong>
            </PurchaseTotalContainer>
            <CheckoutButtonContainer>
              <CartButton onClick={handleCheckout}>Finalizar compra</CartButton>
            </CheckoutButtonContainer>
          </>
        )}
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

const PurchaseTotalContainer = styled.li`
  width: 100%;
  padding: 15px;
  border: var(--primary-border);
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .total-value {
    text-align: right;
    min-width: 100px;
  }
`;

export default CartPage;
