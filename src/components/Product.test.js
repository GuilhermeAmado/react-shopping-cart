import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import toast from 'react-hot-toast';
import Product from './Product';
import { CartContext } from '../CartContext';
import formatCurrency from '../utils/formatCurrency';

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

const mockProduct = {
  id: 1,
  name: 'Test Product',
  description: 'Test Description',
  price: 10.99,
  image: 'test-image.jpg',
};

const mockCartContextValue = {
  cartItems: [],
  setCartItems: jest.fn(),
};

const renderProductWithContext = (product, cartContextValue) => {
  return render(
    <CartContext.Provider value={cartContextValue}>
      <Product product={product} />
    </CartContext.Provider>
  );
};

describe('Product Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    renderProductWithContext(mockProduct, mockCartContextValue);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    // Use a regex to match the price, allowing for non-breaking spaces
    expect(screen.getByText(/R\$\s*10,99/)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
  });

  it('calls handleAddToCart and toast.success when "Adicionar ao carrinho" button is clicked (new item)', () => {
    renderProductWithContext(mockProduct, mockCartContextValue);

    const addButton = screen.getByText('Adicionar ao carrinho');
    fireEvent.click(addButton);

    expect(mockCartContextValue.setCartItems).toHaveBeenCalledTimes(1);
    expect(mockCartContextValue.setCartItems).toHaveBeenCalledWith([
      { ...mockProduct, quantity: 1 },
    ]);
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(
      `${mockProduct.name} adicionado ao carrinho!`,
      { duration: 1000 }
    );
  });

  it('calls handleAddToCart and toast.success when "Adicionar ao carrinho" button is clicked (existing item)', () => {
    const existingCartItem = { ...mockProduct, quantity: 1 };
    const cartContextValueWithExistingItem = {
      cartItems: [existingCartItem],
      setCartItems: jest.fn(),
    };
    renderProductWithContext(mockProduct, cartContextValueWithExistingItem);

    const addButton = screen.getByText('Adicionar ao carrinho');
    fireEvent.click(addButton);

    expect(cartContextValueWithExistingItem.setCartItems).toHaveBeenCalledTimes(1);
    expect(cartContextValueWithExistingItem.setCartItems).toHaveBeenCalledWith([
      { ...existingCartItem, quantity: 2 },
    ]);
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(
      `${mockProduct.name} adicionado ao carrinho!`,
      { duration: 1000 }
    );
  });
});
