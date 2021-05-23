import React, { useState, createContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [isPending, setIsPending] = useState(false);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [productsToDisplay, setProductsToDisplay] = useState(null);
  const [cartItems, setCartItems] = useState(null);

  async function getCategories() {
    const response = await fetch('categories.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    setCategories(data);
  }

  async function getProducts() {
    const response = await fetch('products.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    setProducts(data);
    setProductsToDisplay(data);
  }

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        products,
        setProducts,
        productsToDisplay,
        setProductsToDisplay,
        cartItems,
        setCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
