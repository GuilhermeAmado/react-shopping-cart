import React, { useState, createContext, useEffect } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [isPending, setIsPending] = useState(false);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [productsToDisplay, setProductsToDisplay] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  async function getCategories() {
    setIsPending(true);
    try {
      const response = await fetch('categories.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error('Oops! Ocorreu um erro. Tente novamente mais tarde.');
    } finally {
      setIsPending(false);
    }
  }

  async function getProducts() {
    setIsPending(true);
    try {
      const response = await fetch('products.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      setProducts(data);
      setProductsToDisplay(data);
    } catch (error) {
      toast.error('Oops! Ocorreu um erro. Tente novamente mais tarde.');
    } finally {
      setIsPending(false);
    }
  }

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        isPending,
        setIsPending,
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
