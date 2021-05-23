import React, { useContext } from 'react';
import CategoriesSelect from '../components/CategoriesSelect';
import ProductsList from '../components/ProductsList';
import Product from '../components/Product';
import { CartContext } from '../CartContext';

const ProductsPage = () => {
  const { productsToDisplay } = useContext(CartContext);
  if (!productsToDisplay) return null;
  return (
    <>
      <CategoriesSelect />
      <ProductsList>
        {productsToDisplay.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsList>
    </>
  );
};

export default ProductsPage;
