import React from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import { CartContextProvider } from './CartContext';

function App() {
  return (
    <CartContextProvider>
      <GlobalStyle />
      <Header />
      <ProductsPage />
    </CartContextProvider>
  );
}

export default App;
