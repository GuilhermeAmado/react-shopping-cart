import React from 'react';
import styled from 'styled-components';

const ProductCard = styled.li`
  width: 100%;
  min-height: 175px;
  padding: 15px;
  border: var(--primary-border);
  border-radius: 4px;

  display: flex;
  gap: 15px;
`;

const ProductInfo = styled.div`
  max-width: 350px;
  line-height: 1.5;

  display: flex;
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
  max-width: 200px;
  border-radius: 4px;
  img {
    border-radius: 4px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AddToCartButton = styled.button`
  width: fit-content;
  padding: 0.5em 1em;
  background-color: var(--accent-color);
  color: var(--text-light);
  font-family: inherit;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: var(--accent-color75);
  }
`;

const Product = ({ name, description, price, image }) => {
  return (
    <ProductCard>
      <ProductInfo>
        <h4 className="product-name">{name}</h4>
        <p className="product-description">{description}</p>
        <div className="product-price">
          <p>{price}</p>
          <AddToCartButton>Adicionar ao carrinho</AddToCartButton>
        </div>
      </ProductInfo>

      <ProductImage>
        <img src={image} alt={name} />
      </ProductImage>
    </ProductCard>
  );
};

export default Product;
