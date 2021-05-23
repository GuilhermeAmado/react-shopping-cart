import React from 'react';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import ShoppingCartIcon from './ShoppingCartIcon';

const StyledHeader = styled.header`
  background-color: #f7f7f7;
  box-shadow: var(--primary-shadow);

  svg:hover {
    color: var(--accent-color);
  }

  ul {
    list-style: none;
    padding: 1rem 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <nav>
        <ul>
          <li>
            <FiArrowLeft size="2rem" />
          </li>
          <li>
            <h1>React Cart</h1>
          </li>
          <li>
            <ShoppingCartIcon />
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
