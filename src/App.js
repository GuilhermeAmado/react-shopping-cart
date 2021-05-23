import React from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import CategoriesSelect from './components/CategoriesSelect';
import ProductsList from './components/ProductsList';
import Product from './components/Product';
import { CartContextProvider } from './CartContext';

function App() {
  return (
    <CartContextProvider>
      <GlobalStyle />
      <Header />
      <CategoriesSelect />
      <ProductsList>
        <Product
          name={'Bolo gelado de cenoura'}
          description={
            'Deliciosa massa de bolo de cenoura fofinha com recheios de mousse de chocolate e brigadeiro de chocolate, empanadas na bolacha de chocolate'
          }
          price={'R$ 9,00'}
          image={'/images/bolocenoura.jpg'}
        />
        <Product
          name={'Bolo gelado Ovomaltine'}
          description={
            'Massa de chocolate, brigadeiro de Ovomaltine, mousse de Ovomaltine'
          }
          price={'R$ 9,90'}
          image={'/images/boloovomaltine.jpg'}
        />
      </ProductsList>
    </CartContextProvider>
  );
}

export default App;
