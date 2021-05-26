import React from 'react';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import ShoppingCartIcon from './ShoppingCartIcon';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  return (
    <StyledHeader>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <BackIcon size="2rem" pathname={location.pathname} />
            </Link>
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

const StyledHeader = styled.header`
  margin-bottom: 40px;
  background-color: #f7f7f7;
  box-shadow: var(--primary-shadow);
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  svg {
    color: inherit;
  }

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

const BackIcon = styled(FiArrowLeft)`
  visibility: ${(props) => props.pathname === '/' && 'hidden'};
`;

export default Header;
