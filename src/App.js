import React from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { CartContextProvider } from './CartContext';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <CartContextProvider>
      <GlobalStyle />
      <Toaster position="top-right" />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ProductsPage} />
          <Route path="/checkout" component={CartPage} />
        </Switch>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
