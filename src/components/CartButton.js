import React from 'react';
import styled from 'styled-components';

const CartButton = (props) => {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
};

const StyledButton = styled.button`
  width: fit-content;
  min-height: 30px;
  padding: 0.5em 1em;
  background-color: var(--accent-color);
  color: var(--text-light);
  font-family: inherit;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: var(--accent-color75);
  }
`;

export default CartButton;
