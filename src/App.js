import React from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import { CartContextProvider } from './CartContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <CartContextProvider>
      <Toaster position="bottom-center" />
      <GlobalStyle />
      <Header />
      <ProductsPage />
    </CartContextProvider>
  );
}

export default App;
