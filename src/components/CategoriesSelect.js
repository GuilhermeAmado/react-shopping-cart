import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

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
  return (
    <SelectContainer>
      <Select
        options={options}
        placeholder="Selecione a categoria"
        // className="react-select-main"
        // classNamePrefix="react-select"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'var(--accent-color)',
            primary25: 'var(--accent-color25)',
            primary50: 'var(--accent-color50)',
          },
        })}
      />
    </SelectContainer>
  );
};

export default CategoriesSelect;
