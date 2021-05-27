import React, { useContext, useRef, useEffect, useCallback } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { CartContext } from '../CartContext';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import CartButton from './CartButton';
import { useHistory } from 'react-router-dom';

const Modal = () => {
  const history = useHistory();

  const { showModal, setShowModal, setCartItems } = useContext(CartContext);

  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const handleCloseModal = useCallback(
    function handleCloseModal() {
      setCartItems([]);
      history.push('/');
      setShowModal(false);
    },
    [history, setCartItems, setShowModal]
  );

  function closeModalByOutsideClick(e) {
    if (modalRef.current === e.target) {
      handleCloseModal();
    }
  }

  const closeModalByPressingEsc = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal === true) {
        handleCloseModal();
      }
    },
    [handleCloseModal, showModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModalByPressingEsc);
    return () =>
      document.removeEventListener('keydown', closeModalByPressingEsc);
  }, [closeModalByPressingEsc]);

  if (!showModal) return null;

  return ReactDom.createPortal(
    <>
      <Background ref={modalRef} onClick={closeModalByOutsideClick}>
        <animated.div style={animation}>
          <ModalWrapper>
            <ModalContent>
              <CloseModalButton
                aria-label="fechar pop-up"
                onClick={() => handleCloseModal()}
              />
              <SuccessIcon size="3rem" />
              <h2>Pedido realizado com sucesso!</h2>
              <CartButton onClick={() => handleCloseModal()}>Fechar</CartButton>
            </ModalContent>
          </ModalWrapper>
        </animated.div>
      </Background>
    </>,
    document.getElementById('modal-portal')
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 0%, 0.8);
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  position: relative;
  margin: 15px;
  padding: 3rem;
  max-width: 600px;
  min-height: 250px;
  box-shadow: 0 5px 16px hsla(0, 0%, 0%, 0.2);
  background-color: #fff;
  color: var(--text-dark);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10;
  border-radius: 4px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: var(--text-dark);
  h2 {
    margin: 15px 0 30px 0;
    text-align: center;
  }

  p {
    margin-bottom: 1rem;
  }
`;

const CloseModalButton = styled(FiX)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const SuccessIcon = styled(FiCheckCircle)`
  color: var(--success-color);
`;

export default Modal;
