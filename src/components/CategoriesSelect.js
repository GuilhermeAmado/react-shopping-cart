import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { CartContext } from '../CartContext';

const SelectContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
`;

const CategoriesSelect = () => {
  const {
    categories,
    products,
    setProductsToDisplay,
    selectedCategory,
    setSelectedCategory,
  } = useContext(CartContext);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  useEffect(() => {
    if (selectedCategory) {
      const filteredProducts = products.filter(
        ({ idCategory }) => idCategory === selectedCategory.id
      );
      setProductsToDisplay(filteredProducts);
    }
  }, [products, selectedCategory, setProductsToDisplay]);

  if (!products) return null;
  return (
    <SelectContainer>
      <Select
        options={categories}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option}
        value={selectedCategory}
        onChange={(category) => handleCategoryChange(category)}
        placeholder="Selecione a categoria"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'var(--accent-color)',
            primary25: 'var(--accent-color25)',
            primary50: 'var(--accent-color50)',
            primary75: 'var(--accent-color75)',
          },
        })}
      />
    </SelectContainer>
  );
};

export default CategoriesSelect;
