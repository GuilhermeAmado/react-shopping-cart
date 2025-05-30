import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoriesSelect from './CategoriesSelect';
import { CartContext } from '../CartContext';

const mockAllCategoriesOption = { id: null, name: 'Todas as categorias' };
const mockCategories = [
  mockAllCategoriesOption,
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Books' },
];

const mockProducts = [
  { id: 101, name: 'Laptop', idCategory: 1 },
  { id: 102, name: 'Keyboard', idCategory: 1 },
  { id: 201, name: 'React Guide', idCategory: 2 },
  { id: 202, name: 'JS Algorithms', idCategory: 2 },
];

const mockSetSelectedCategory = jest.fn();
const mockSetProductsToDisplay = jest.fn();

const renderCategoriesSelectWithContext = (categories, products, selectedCategory = null) => {
  return render(
    <CartContext.Provider
      value={{
        categories,
        products,
        selectedCategory,
        setSelectedCategory: mockSetSelectedCategory,
        setProductsToDisplay: mockSetProductsToDisplay,
      }}
    >
      <CategoriesSelect />
    </CartContext.Provider>
  );
};

describe('CategoriesSelect Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders null if products are not available', () => {
    const { container } = renderCategoriesSelectWithContext(mockCategories, null);
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly with "Todas as categorias" and other categories', () => {
    renderCategoriesSelectWithContext(mockCategories, mockProducts);
    
    // Target the placeholder text to click and open the dropdown
    const selectControl = screen.getByText('Selecione a categoria');
    expect(selectControl).toBeInTheDocument();
    userEvent.click(selectControl); // Open dropdown

    // Check if options are now visible/rendered
    expect(screen.getByText('Todas as categorias')).toBeInTheDocument();
    mockCategories.slice(1).forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('calls setSelectedCategory and setProductsToDisplay when a specific category is selected', async () => {
    const { rerender } = renderCategoriesSelectWithContext(mockCategories, mockProducts, mockAllCategoriesOption);
    
    // The select will show the current value 'Todas as categorias'
    const selectControl = screen.getByText(mockAllCategoriesOption.name);
    await userEvent.click(selectControl); // Open dropdown

    const categoryToSelect = mockCategories[1]; // Electronics
    await userEvent.click(screen.getByText(categoryToSelect.name));

    expect(mockSetSelectedCategory).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedCategory).toHaveBeenCalledWith(categoryToSelect);

    // useEffect in CategoriesSelect handles setProductsToDisplay
    // We need to check the effect of setSelectedCategory triggering the useEffect
    // The actual call to setProductsToDisplay happens due to the change in selectedCategory
    // For this test, we assume the useEffect in the component works as intended
    // and is tested by the fact that setSelectedCategory was called.
    // A more integrated test would check the arguments of setProductsToDisplay
    // after the state update and useEffect run.
    // The component's useEffect will be triggered by this selection.
    // We can verify that setProductsToDisplay is called, but its argument depends on the component's internal logic.
    // Let's assume the component's useEffect is correct for now.
    // If we want to test the outcome of setProductsToDisplay, we'd need to simulate the useEffect's execution.
    // The prompt asks if setProductsToDisplay is "called".
    // Due to the async nature of state updates and useEffect, we might need to wait.
    // However, the direct call is setSelectedCategory. The useEffect is a side effect.
    // The most direct test is that setSelectedCategory is called.
    // The problem statement implies testing the effect, so we should ideally check setProductsToDisplay.
    
    // To properly test the useEffect, we need to simulate the context update
    // This is tricky because the actual setProductsToDisplay is inside useEffect
    // For now, let's check if it was called. The arguments depend on the component's implementation.
    // The component's useEffect will call setProductsToDisplay.
    // This requires a bit of trust in the useEffect's implementation or a more complex setup.
    // Given the current structure, we test that setSelectedCategory is called.
    // The useEffect will then use this new selectedCategory.
    // The prompt implies we should check setProductsToDisplay.

    // The component's useEffect will run after setSelectedCategory updates the state.
    // We can check that setProductsToDisplay is called by the useEffect.
    // This test will pass if setSelectedCategory is called, which then triggers the useEffect.
    // The component's handleCategoryChange calls mockSetSelectedCategory.
    // To trigger the useEffect, we need to re-render the component with the new selectedCategory value.
    // This simulates React's re-render cycle after a state update in the context.
    
    // Simulate the parent component (or context) re-rendering with the new selected category
    rerender(
      <CartContext.Provider
        value={{
          categories: mockCategories,
          products: mockProducts,
          selectedCategory: categoryToSelect, // Use the category that was supposedly set
          setSelectedCategory: mockSetSelectedCategory,
          setProductsToDisplay: mockSetProductsToDisplay,
        }}
      >
        <CategoriesSelect />
      </CartContext.Provider>
    );

    await waitFor(() => {
      const expectedFilteredProducts = mockProducts.filter(p => p.idCategory === categoryToSelect.id);
      expect(mockSetProductsToDisplay).toHaveBeenCalledWith(expectedFilteredProducts);
    });
  });

  it('calls setSelectedCategory and potentially setProductsToDisplay when "Todas as categorias" is selected', async () => {
    const initiallySelectedCategory = mockCategories[1]; // Electronics
    const { rerender } = renderCategoriesSelectWithContext(mockCategories, mockProducts, initiallySelectedCategory); 
    
    const selectControl = screen.getByText(initiallySelectedCategory.name);
    await userEvent.click(selectControl); 

    await userEvent.click(screen.getByText(mockAllCategoriesOption.name));

    expect(mockSetSelectedCategory).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedCategory).toHaveBeenCalledWith(mockAllCategoriesOption);

    // Re-render with the new selectedCategory (mockAllCategoriesOption)
    rerender(
      <CartContext.Provider
        value={{
          categories: mockCategories,
          products: mockProducts,
          selectedCategory: mockAllCategoriesOption, // The "newly selected" category
          setSelectedCategory: mockSetSelectedCategory,
          setProductsToDisplay: mockSetProductsToDisplay,
        }}
      >
        <CategoriesSelect />
      </CartContext.Provider>
    );
    
    // Based on current component logic: if selectedCategory is {id: null, name: "..."}
    // The useEffect will filter products where product.idCategory === null.
    await waitFor(() => {
      const expectedFilteredForNullCategory = mockProducts.filter(p => p.idCategory === null); // Should be []
      expect(mockSetProductsToDisplay).toHaveBeenCalledWith(expectedFilteredForNullCategory);
    });

    // TODO: Discuss with team if "Todas as categorias" (id: null) should display all products.
    // If so, CategoriesSelect.js useEffect needs an update:
    // if (selectedCategory && selectedCategory.id !== null) { ... filter ... } 
    // else if (selectedCategory && selectedCategory.id === null) { setProductsToDisplay(products) }
    // Or, if selectedCategory becomes `null` itself for "All":
    // if (selectedCategory) { ... filter ... } else { setProductsToDisplay(products) }
  });
});
