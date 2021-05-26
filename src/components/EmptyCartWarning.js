import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiAlertTriangle } from 'react-icons/fi';

const EmptyCartWarning = () => {
  return (
    <WarningContainer>
      <header>
        <FiAlertTriangle size="2rem" />
        <h2>Carrinho vazio!</h2>
      </header>
      <p>
        <Link to="/">Clique aqui</Link> para voltar à pagina principal.
      </p>
    </WarningContainer>
  );
};

const WarningContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 15px;
  border: var(--primary-border);
  background-color: var(--warning-color50);
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  h2 {
    line-height: 1;
  }

  p {
    margin-top: 15px;
  }

  a {
    color: inherit;
    font-weight: 700;

    :hover {
      color: var(--accent-color);
    }
  }
`;

export default EmptyCartWarning;
