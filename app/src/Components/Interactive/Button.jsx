import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Button({ children, bg, hover, color, fnClick, type }) {
  return (
    <ButtonStyled bg={bg} hover={hover} color={color} onClick={fnClick} type={type}>
      {children}
    </ButtonStyled>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.string,
  hover: PropTypes.string,
  color: PropTypes.string,
  fnClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  bg: 'colorPrimary',
  hover: 'colorSecundary',
  color: 'white',
  fnClick: () => {},
  type: 'button',
};

export default Button;

const ButtonStyled = styled.button`
  background: ${({ theme, bg }) => theme[bg]};
  color: ${({ theme, color }) => theme[color]};
  padding: 14px 22px;
  border-radius: 24px;
  font-size: 12px;
  width: 100%;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background: ${({ theme, hover }) => theme[hover]};
  }
`;
