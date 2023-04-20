import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Modal({ onClose, children }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalWrapper>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  onClose: () => {},
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  overflow-y: auto;
  padding: 48px 0px;
`;

const ModalWrapper = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 32px;
  max-width: 480px;
  width: 100%;
  font-size: 13px;
`;
