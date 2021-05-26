import React from 'react';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import ShoppingCartIcon from './ShoppingCartIcon';
import { Link, useLocation } from 'react-router-dom';

const StyledHeader = styled.header`
  margin-bottom: 40px;
  background-color: #f7f7f7;
  box-shadow: var(--primary-shadow);
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  nav {
    max-width: 800px;
    margin: 0 auto;
  }

  a:hover {
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
  const location = useLocation();
  return (
    <StyledHeader>
      <nav>
        <ul>
          <li>
            {location.pathname !== '/' && (
              <Link to="/">
                <FiArrowLeft size="2rem" />
              </Link>
            )}
          </li>
          <li>
            <Link to="/">
              <h1>React Cart</h1>
            </Link>
          </li>
          <li>
            <Link to="/checkout">
              <ShoppingCartIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
