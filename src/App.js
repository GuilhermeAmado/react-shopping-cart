import React from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './components/Header';
import CategoriesSelect from './components/CategoriesSelect';
import ProductsList from './components/ProductsList';
import Product from './components/Product';

function App() {
  return (
    <>
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
          image={
            'https://static.wixstatic.com/media/0082f3_8bb322cf93764356895281a43a926c5e~mv2.jpg'
          }
        />
        <Product
          name={'Bolo gelado Ovomaltine'}
          description={
            'Massa de chocolate, brigadeiro de Ovomaltine, mousse de Ovomaltine'
          }
          price={'R$ 9,90'}
          image={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwXEubek4HwbX28RDlImCAOho4uAOMuKG3ZEV66-o0_IwGA6-5w1tD3ji9M65sXKTCmiU&usqp=CAU'
          }
        />
      </ProductsList>
    </>
  );
}

export default App;
