import React, { useContext } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { CartContext } from '../CartContext';

const options = [
  { value: 'salgados', label: 'Salgados' },
  { value: 'doces', label: 'Doces' },
  { value: 'bebidas', label: 'Bebidas' },
];

const SelectContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
`;

const CategoriesSelect = () => {
  const { selectedCategory, setSelectedCategory } = useContext(CartContext);
  return (
    <SelectContainer>
      <Select
        options={options}
        value={selectedCategory}
        onChange={setSelectedCategory}
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
