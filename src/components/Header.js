import React from 'react';
import styled from 'styled-components';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

const StyledHeader = styled.header`
  ul {
    list-style: none;
    background-color: azure;
    padding: 1rem 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .shopping-cart-icon {
      position: relative;
    }

    .counter {
      position: absolute;
      top: -10px;
      left: 20px;
    }
  }
`;

const ItemsCounter = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: antiquewhite;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
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
            <h1>logo</h1>
          </li>
          <li className="shopping-cart-icon">
            <FiShoppingCart size="2rem" className="icon" />
            <ItemsCounter className="counter">
              <strong>5</strong>
            </ItemsCounter>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
