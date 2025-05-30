import React, { useContext } from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { CartContext, CartContextProvider } from './CartContext';
import toast from 'react-hot-toast';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
  success: jest.fn(), // Added success as it's used in Product.js which might be indirectly involved or for future use
}));

// Mock fetch
global.fetch = jest.fn();

const mockCategories = [{ id: 1, name: 'Category 1' }];
const mockProducts = [{ id: 1, name: 'Product 1', categoryId: 1, price: 10 }];

// A dummy component to consume the context
const TestConsumerComponent = ({ testId = "consumer" }) => {
  const context = useContext(CartContext);
  return <div data-testid={testId}>{JSON.stringify(context)}</div>;
};

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset fetch mock for each test
    global.fetch.mockReset();
    // Default successful mock for initial getCategories and getProducts calls in useEffect
    global.fetch
      .mockResolvedValueOnce({ // For getCategories
        ok: true,
        json: async () => mockCategories,
      })
      .mockResolvedValueOnce({ // For getProducts
        ok: true,
        json: async () => mockProducts,
      });
  });

  test('initial context values are set up correctly', async () => {
    let contextValue;
    render(
      <CartContextProvider>
        <CartContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </CartContext.Consumer>
      </CartContextProvider>
    );

    // Wait for initial useEffect calls to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0)); // allow microtasks to run
    });
    
    expect(contextValue.cartItems).toEqual([]);
    expect(contextValue.productsToDisplay).toEqual(mockProducts); // Updated due to initial fetch
    expect(contextValue.categories).toEqual(mockCategories); // Updated due to initial fetch
    expect(contextValue.showModal).toBe(false);
    expect(contextValue.selectedCategory).toBe(null);
    expect(contextValue.isPending).toBe(false); // After initial fetches
  });

  describe('getCategories', () => {
    test('updates categories state on successful fetch', async () => {
      // This test will rely on the initial fetch in useEffect, or we can call it directly
      // For simplicity, we'll check the state after the initial useEffect fetch
      const { getByTestId } = render(
        <CartContextProvider>
          <TestConsumerComponent />
        </CartContextProvider>
      );
      await waitFor(() => {
        const context = JSON.parse(getByTestId('consumer').textContent);
        expect(context.categories).toEqual(mockCategories);
      });
      expect(global.fetch).toHaveBeenCalledWith('categories.json', expect.any(Object));
    });

    test('calls toast.error on failed fetch', async () => {
      global.fetch.mockReset(); // Reset to override default successful mock
      global.fetch.mockRejectedValueOnce(new Error('Network error'));
      // Need to prevent the products fetch from succeeding or it might mask the categories error toast
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockProducts });


      render(
        <CartContextProvider>
          <TestConsumerComponent />
        </CartContextProvider>
      );

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Oops! Ocorreu um erro. Tente novamente mais tarde.');
      });
    });
  });

  describe('getProducts', () => {
    test('updates products and productsToDisplay states on successful fetch', async () => {
      const { getByTestId } = render(
        <CartContextProvider>
          <TestConsumerComponent />
        </CartContextProvider>
      );
      await waitFor(() => {
        const context = JSON.parse(getByTestId('consumer').textContent);
        expect(context.products).toEqual(mockProducts);
        expect(context.productsToDisplay).toEqual(mockProducts);
      });
      expect(global.fetch).toHaveBeenCalledWith('products.json', expect.any(Object));
    });

    test('calls toast.error on failed fetch', async () => {
      global.fetch.mockReset();
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockCategories }); // categories fetch success
      global.fetch.mockRejectedValueOnce(new Error('Network error')); // products fetch fail

      render(
        <CartContextProvider>
          <TestConsumerComponent />
        </CartContextProvider>
      );

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Oops! Ocorreu um erro. Tente novamente mais tarde.');
      });
    });
  });

  describe('Cart Operations', () => {
    let contextRef;

    const renderWithCartConsumer = () => {
      return render(
        <CartContextProvider>
          <CartContext.Consumer>
            {(value) => {
              contextRef = value; // Capture context value
              return <div data-testid="cart-consumer">{/* Display something if needed */}</div>;
            }}
          </CartContext.Consumer>
        </CartContextProvider>
      );
    };

    test('adds a new item to cartItems', async () => {
      renderWithCartConsumer();
      await waitFor(() => expect(contextRef.isPending).toBe(false)); // Ensure initial fetches are done

      const newItem = { id: 2, name: 'New Product', price: 20 };
      act(() => {
        contextRef.setCartItems([...contextRef.cartItems, { ...newItem, quantity: 1 }]);
      });
      expect(contextRef.cartItems).toHaveLength(1);
      expect(contextRef.cartItems[0]).toEqual({ ...newItem, quantity: 1 });
    });

    test('increments quantity if item already exists in cartItems', async () => {
      renderWithCartConsumer();
      await waitFor(() => expect(contextRef.isPending).toBe(false));

      const existingItem = { id: 1, name: 'Product 1', price: 10 }; // Matches mockProducts
      // Add item first time
      act(() => {
        contextRef.setCartItems([{ ...existingItem, quantity: 1 }]);
      });
      expect(contextRef.cartItems[0].quantity).toBe(1);

      // Add same item again
      act(() => {
        const itemInCart = contextRef.cartItems.find(item => item.id === existingItem.id);
        const updatedCart = contextRef.cartItems.map(item => 
          item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        contextRef.setCartItems(updatedCart);
      });
      expect(contextRef.cartItems).toHaveLength(1);
      expect(contextRef.cartItems[0].quantity).toBe(2);
    });
    
    test('updates showModal state', async () => {
      renderWithCartConsumer();
      await waitFor(() => expect(contextRef.isPending).toBe(false));

      expect(contextRef.showModal).toBe(false);
      act(() => {
        contextRef.setShowModal(true);
      });
      expect(contextRef.showModal).toBe(true);
    });
  });
});
