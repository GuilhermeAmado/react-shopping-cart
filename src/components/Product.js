import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { CartContext } from '../CartContext';
import formatCurrency from '../utils/formatCurrency';
import CartButton from './CartButton';

const ProductCard = styled.li`
  width: 100%;
  /* min-height: 175px; */
  /* min-height: 180px; */
  padding: 15px;
  border: var(--primary-border);
  border-radius: 4px;

  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const ProductInfo = styled.div`
  /* max-width: 350px; */
  width: 70%;
  line-height: 1.5;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  .product-name {
    font-size: 1.25rem;
    line-height: 1.2;
  }

  .product-description {
    font-size: 0.9rem;
    font-weight: 300;
  }

  .product-price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const ProductImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 4px;
  img {
    border-radius: 4px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Product = ({ product }) => {
  const { cartItems, setCartItems } = useContext(CartContext);

  function handleAddToCart(product) {
    const productAlreadyOnCart = cartItems.find(
      (item) => item.id === product.id
    );
    if (productAlreadyOnCart) {
      const productToUpdateQuantity = { ...productAlreadyOnCart };
      const currentQuantity = productToUpdateQuantity.quantity || 1;
      setCartItems([
        ...cartItems.filter((item) => item.id !== productToUpdateQuantity.id),
        { ...productToUpdateQuantity, quantity: currentQuantity + 1 },
      ]);
    } else {
      const productToAddToCart = { ...product, quantity: 1 };
      setCartItems([...cartItems, productToAddToCart]);
    }
    toast.success(`${product.name} adicionado ao carrinho!`, {
      duration: 1000,
    });
  }

  return (
    <ProductCard>
      <ProductInfo>
        <h4 className="product-name">{product.name}</h4>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <p>{formatCurrency(product.price)}</p>
          <CartButton onClick={() => handleAddToCart(product)}>
            Adicionar ao carrinho
          </CartButton>
        </div>
      </ProductInfo>

      <ProductImage>
        <img src={product.image} alt={product.name} />
      </ProductImage>
    </ProductCard>
  );
};

export default Product;
