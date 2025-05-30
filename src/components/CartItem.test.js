import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './CartItem';
import { CartContext } from '../CartContext';
import formatCurrency from '../utils/formatCurrency';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockItem = {
  id: 1,
  name: 'Test Item',
  price: 10,
  quantity: 2,
};

const mockCartContextValue = {
  cartItems: [mockItem],
  setCartItems: jest.fn(),
};

const renderCartItemWithContext = (item, cartContextValue) => {
  return render(
    <CartContext.Provider value={cartContextValue}>
      <CartItem item={item} />
    </CartContext.Provider>
  );
};

describe('CartItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders item information correctly', () => {
    renderCartItemWithContext(mockItem, mockCartContextValue);

    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockItem.quantity.toString())).toBeInTheDocument();
    // Use a regex to match the price, allowing for non-breaking spaces
    expect(
      screen.getByText(/R\$\s*20,00/)
    ).toBeInTheDocument();
  });

  it('calls handleItemCartCountUpdate with "add" when plus button is clicked', () => {
    renderCartItemWithContext(mockItem, mockCartContextValue);
    const plusButton = screen.getByLabelText(/add/i); // Using regex for aria-label or similar
    fireEvent.click(plusButton);

    expect(mockCartContextValue.setCartItems).toHaveBeenCalledTimes(1);
    const updatedItems = mockCartContextValue.setCartItems.mock.calls[0][0];
    expect(updatedItems[0].quantity).toBe(mockItem.quantity + 1);
  });

  it('calls handleItemCartCountUpdate with "remove" when minus button is clicked', () => {
    renderCartItemWithContext(mockItem, mockCartContextValue);
    const minusButton = screen.getByLabelText(/remove/i); // Using regex for aria-label or similar
    fireEvent.click(minusButton);

    expect(mockCartContextValue.setCartItems).toHaveBeenCalledTimes(1);
    const updatedItems = mockCartContextValue.setCartItems.mock.calls[0][0];
    expect(updatedItems[0].quantity).toBe(mockItem.quantity - 1);
  });

  it('removes item from cart if quantity becomes 0 after clicking minus button', () => {
    const singleQuantityItem = { ...mockItem, quantity: 1 };
    let currentCartStateInMock = [singleQuantityItem];
    const mockSetCartItems = jest.fn(updater => {
      if (typeof updater === 'function') {
        currentCartStateInMock = updater(currentCartStateInMock);
      } else {
        currentCartStateInMock = updater;
      }
    });
    const cartContext = {
      cartItems: [singleQuantityItem], // Initial state for first render
      setCartItems: mockSetCartItems,
    };
    renderCartItemWithContext(singleQuantityItem, cartContext);

    const minusButton = screen.getByLabelText(/remove/i);
    fireEvent.click(minusButton); // Quantity becomes 0

    // Check if setCartItems was called to update quantity to 0
    expect(cartContext.setCartItems).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: singleQuantityItem.id, quantity: 0 }),
      ])
    );
    
    // The component re-renders, and useEffect for quantity 0 is triggered
    // which calls setCartItems again to filter out the item.
    // So we expect a second call.
    // Wait for the useEffect to trigger the second setCartItems call
    // The first call updates the quantity to 0.
    expect(cartContext.setCartItems).toHaveBeenCalledTimes(2); // handleItemCartCountUpdate + useEffect
    expect(cartContext.setCartItems).toHaveBeenNthCalledWith(1, 
      [{ ...singleQuantityItem, quantity: 0 }]
    );

    // The useEffect calls setCartItems with a filtering function.
    // The mockSetCartItems will execute this function.
    // So, currentCartStateInMock should now be empty.
    expect(currentCartStateInMock).toEqual([]);
  });
  
  it('redirects to home if cart becomes empty after item removal (last item quantity becomes 0)', () => {
    const singleItemInCart = { ...mockItem, quantity: 1 };
    
    // Mock setCartItems to simulate React's state update behavior
    // and also to update the cartItems in the mock context for the useEffect dependency
    let currentCartItemsState = [singleItemInCart];
    const mockSetCartItems = jest.fn(updater => {
      if (typeof updater === 'function') {
        currentCartItemsState = updater(currentCartItemsState);
      } else {
        currentCartItemsState = updater;
      }
    });

    const cartContext = {
      cartItems: [singleItemInCart], // Initial state for rendering
      setCartItems: mockSetCartItems,
    };
    renderCartItemWithContext(singleItemInCart, cartContext);
  
    const minusButton = screen.getByLabelText(/remove one item/i);
    fireEvent.click(minusButton); // Quantity becomes 0

    // After click, handleItemCartCountUpdate is called. It calls setCartItems.
    // This triggers re-render and useEffect. useEffect calls setCartItems again.
    // The second call to setCartItems (from useEffect) is what actually empties the cart.
    // The history.push is in handleItemCartCountUpdate, which is called *before* the cart is truly empty.
    // The condition `updatedCartItems.length === 1 && updatedCartItems[0].quantity === 0`
    // in `handleItemCartCountUpdate` will be true.
  
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });

  it('returns null if initial item quantity is 0', () => {
    const zeroQuantityItem = { ...mockItem, quantity: 0 };
    const { container } = renderCartItemWithContext(
      zeroQuantityItem,
      mockCartContextValue
    );
    expect(container.firstChild).toBeNull();
  });
});
